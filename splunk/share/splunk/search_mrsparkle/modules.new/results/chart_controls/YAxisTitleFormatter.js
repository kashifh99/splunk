Splunk.namespace("Module");

Splunk.Module.YAxisTitleFormatter = $.klass(Splunk.Module.BaseChartFormatter, {

    initialize: function($super, container){
        $super(container);

        this.logger = Splunk.Logger.getLogger("y_axis_title_formatter.js");

        this._formElement = $("input",this.container)
            .bind("change", this.handleInputChange.bind(this));

        this._contextKey = "charting.secondaryAxisTitle.text";
    },

    getGenericTitle: function() {
        var context = this.getContext();
        var search  = context.get("search");
        var plotIntention = search.popIntention("plot");
        var title = "";
        if (plotIntention && plotIntention["arg"].hasOwnProperty("mode")) {
            var mode = plotIntention["arg"]["mode"];
            if (mode == "timechart") {
                if (plotIntention["arg"].hasOwnProperty("fields")) {
                    var fieldsList = plotIntention["arg"]["fields"];
                    if (fieldsList.length == 1) {
                        var statOpName = fieldsList[0][0];
                        var fieldName = fieldsList[0][1];
                        if (fieldName=="__events") {
                            return sprintf(_("%(statOpName)s of events"), { statOpName: statOpName});
                        } else {
                            return sprintf(_("%(statOpName)s of %(fieldName)s"), { statOpName: statOpName, fieldName : fieldName});
                        }
                    }
                }
            } else if (mode=="top" || mode=="rare") {
                if (plotIntention["arg"].hasOwnProperty("fields")) {
                    title = _("Frequency");
                } else {
                    this.logger.error("top/rare mode, but no fields specified");
                }
            }
        }
        return title;
    },

    getModifiedContext: function(){
        var context = this.getContext();
        var value = this.escapePropertyManagerControlChars(this._formElement.val());
        // SPL-58465: for consistency with the Advanced and Simple XML parsers, if the title text is undefined the default
        // title will be displayed, if it is null or the empty string then no title is displayed
        if(value !== '') {
            context.set(this._contextKey, value);
        }
        else {
            context.set(this._contextKey, undefined);
        }
        return context;
    },
    
    onContextChange: function($super) {
        // if its showing nothing or it's showing the last one we autogenerated
        if (!this._formElement.val() || this._formElement.val() == this._lastGenericTitle) {
            var title = this.getGenericTitle();
            this._lastGenericTitle = title;
            this._formElement.val(title);
            this.setParam("default", title);
        }
        $super();
    },

    /**
     * disable for gauges
     */
    isCompatibleWithContext: function() {
        var context = this.getContext();
        if (!context.has("charting.chart")) return true;
        
        var incompatibleChartTypes = {
            'radialGauge':1,
            'fillerGauge':1,
            'markerGauge':1,
            'pie':1,
            'ratioBar':1
        };
        return !incompatibleChartTypes.hasOwnProperty(context.get('charting.chart'));
    }
});
