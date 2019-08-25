/**
 * Created by ykou on 3/11/15.
 */
define([
    'underscore',
    "models/monitoringconsole/splunk_health_check/CheckList",
    "collections/SplunkDsBase"
], function(
    _,
    Model,
    SplunkDsBaseCollection
) {
    return SplunkDsBaseCollection.extend({
        url: 'configs/conf-checklist',
        model: Model,
        fetch: function(options) {
            options || (options = {});
            options.data || (options.data = {});
            // the app and owner options are always needed when fetching a custom conf file.
            // SPL-162370: set the count to 0 so all checks are fetched.
            _.defaults(options.data, {
                app: '-',
                owner: '-',
                count: 0
            });
            return SplunkDsBaseCollection.prototype.fetch.call(this, options);
        },

        // returns an array of enabled check items. 
        filterByEnabled: function() {
            return this.filter(function(item) {
                return !item.isDisabled();
            });
        }
    });
});