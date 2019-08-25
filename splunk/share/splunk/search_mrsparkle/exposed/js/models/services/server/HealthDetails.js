define(
    [
        'underscore',
        'models/SplunkDBase'
    ],
    function (_, SplunkDBaseModel) {
        return SplunkDBaseModel.extend({
            urlRoot: 'server/health/splunkd',
            id: 'details',
            processFeatures: function (features) {
                var output = [];
                _.each(features, function(comp, name) {
                    var obj = {
                        name: name,
                        health: comp.health,
                        reasons: comp.reasons,
                        messages: comp.messages,
                        disabled: comp.disabled
                    };
                    if (comp.features) {
                        obj.features = this.processFeatures(comp.features);
                    }
                    output.push(obj);
                    var map = this.get('map') || {};
                    map[name] = obj;
                    this.set('map', map);

                }.bind(this));
                return output;
            },

            parse: function(response) {
                if (!response.entry) return;
                var responseObj = response.entry[0],
                    rootObj = {
                    name: responseObj.name,
                    health: responseObj.content.health,
                    disabled: responseObj.content.disabled
                };
                if (_.keys(responseObj.content.features).length > 0) {
                    rootObj.features = this.processFeatures(responseObj.content.features);
                }

                this.set('parsed', rootObj);
                return SplunkDBaseModel.prototype.parse.call(this, response);

            }

        });
    });