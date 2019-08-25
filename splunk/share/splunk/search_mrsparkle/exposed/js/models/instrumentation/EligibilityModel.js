/**
 * Checks Eligibility of opt in.
 */
define(
    [
        'underscore',
        'models/Base',
        'splunk.util'
    ],
    function(_, BaseModel, SplunkUtil) {
        return BaseModel.extend({
            url: function() {
                return SplunkUtil.make_url('/splunkd/__raw/servicesNS/nobody/splunk_instrumentation/instrumentation_controller/' +
                                           'instrumentation_eligibility?optInVersion=3');
            },
            initialize: function(options) {
                BaseModel.prototype.initialize.apply(this, arguments);

                this.root = '';
                if (options && options.application) {
                    var root = options.application.get('root');
                    if (root) {
                        this.root = '/' + root;
                    }
                }
            },
            isEligible: function() {
                return this.get('is_eligible');
            }
        });
    }
);
