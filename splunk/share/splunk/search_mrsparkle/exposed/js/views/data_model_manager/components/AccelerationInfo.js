/**
 * @author jszeto
 * @date 6/11/13
 *
 * Displays the summary information for a TSIDX namespace
 *
 * Inputs:
 *
 *     model {models/services/summarization/TStatsSummarization}
 */

define([
    'jquery',
    'underscore',
    'module',
    'views/Base',
    'splunk.util',
    'util/time',
    'splunk.i18n',
    'util/format_numbers_utils'

],
    function(
        $,
        _,
        module,
        BaseView,
        splunkUtils,
        time_utils,
        i18n,
        numUtils
        ) {

        return BaseView.extend({
            tagName: 'dl',
            className: "list-dotted",
            moduleId: module.id,

            initialize: function(options) {
                BaseView.prototype.initialize.call(this, options);

                this.model.on("change", this.debouncedRender, this);
            },

            formattedTimeString: function(timestr) {
                if (!timestr) {
                    return '';
                }
                return i18n.format_datetime_microseconds(
                    time_utils.jsDateToSplunkDateTimeWithMicroseconds(time_utils.isoToDateObject(timestr))
                );
            },


            render: function() {
                var accessCount = this.model.entry.content.get('summary.access_count'),
                    accessDateString = this.model.entry.content.get('summary.access_time'),
                    accessDate = accessCount===0 || accessDateString === undefined ? "-": this.formattedTimeString(accessDateString),
                    updatedString = this.model.entry.content.get('summary.mod_time'),
                    updatedDate = updatedString === undefined ? "-": this.formattedTimeString(updatedString),
                    html = this.compiledTemplate({
                        summary: this.model.entry.content,
                        summarySizeString: numUtils.bytesToFileSize(this.model.entry.content.get("summary.size")),
                        lastAccessed: accessDate,
                        lastUpdated: updatedDate, 
                        sprintf: splunkUtils.sprintf});

                this.$el.html(html);

                return this;
            },

            template: '\
                <% if (summary.get("summary.id")) { %>\
                    <dt><%- _("Status").t() %></dt>\
                    <dd><% if (summary.get("summary.complete")) { %>\
                            <%- sprintf(_("%s%% Completed").t(), (summary.get("summary.complete")*100).toFixed(2)) %>\
                        <% } else { %>\
                            <%- _("Building").t() %>\
                        <% } %>\
                    </dd>\
                    <dt><%- _("Access Count").t() %></dt>\
                    <dd><%- sprintf(_("%s. Last Access: %s").t(), \
                    summary.get("summary.access_count"), lastAccessed) %></dd>\
                    <dt><%- _("Size on Disk").t() %></dt>\
                    <dd><%- summarySizeString %></dd>\
                    <dt><%- _("Summary Range").t() %></dt>\
                    <dd><%- sprintf(_("%s second(s)").t(), summary.get("summary.time_range")) %></dd>\
                    <dt><%- _("Buckets").t() %></dt>\
                    <dd><%- summary.get("summary.buckets") %></dd>\
                    <dt><%- _("Updated").t() %></dt>\
                    <dd><%- lastUpdated %></dd>\
                 <% } %>\
            '
        });
    });
