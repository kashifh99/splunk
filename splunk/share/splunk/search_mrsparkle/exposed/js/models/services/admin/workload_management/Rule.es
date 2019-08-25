import SplunkDBaseModel from 'models/SplunkDBase';

export default SplunkDBaseModel.extend({
    urlRoot: 'services/workloads/rules',
    url: 'workloads/rules',

    getOrder() {
        return this.entry.content.get('order') || null;
    },
    getRuleName() {
        return this.entry.get('name');
    },
    getPredicate() {
        return this.entry.content.get('predicate') || null;
    },
    getWorkloadPool() {
        return this.entry.content.get('workload_pool') || null;
    },
    isApplied() {
        return this.get('isApplied');
    },
});