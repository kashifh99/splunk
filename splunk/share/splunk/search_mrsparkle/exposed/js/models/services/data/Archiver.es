/*
 * @author jsolis
 * @date 6/13/17
 */
import _ from 'underscore';
import SplunkDBaseModel from 'models/SplunkDBase';

export default SplunkDBaseModel.extend({
    url: 'data/archiver',
    urlRoot: 'data/archiver',
    defaults: {
        name: '',
        maxIndexSize: '',
        maxIndexSizeFormat: 'GB',
        frozenTimePeriodInDays: '',
        'archive.enabled': false,
        'archive.provider': '',
        datatype: 'event',
    },

    validation: {
        name: [{
            fn(value, attr, computedState) {
                if (computedState.isNew) {
                    if (value === '') {
                        return _('Index Name is required.').t();
                    }
                }
                return '';
            },
        }, {
            fn(value, attr, computedState) {
                if (computedState.isNew) {
                    if (!/^[a-z0-9]([a-z0-9_\-]*)$/.test(value)) { // eslint-disable-line no-useless-escape
                        return _(`Index Names may contain only lowercase letters, numbers, underscores, or hyphens.
                            They must begin with a lowercase letter or number.`).t();
                    }
                }
                return '';
            },
        }],
        maxIndexSize: [{
            required: true,
            msg: _('Max Data Size is required.').t(),
        }, {
            pattern: /^[\d]+$/,
            msg: _('Max Data Size must be a positive integer.').t(),
        }],
        frozenTimePeriodInDays: [{
            required: true,
            msg: _('Retention is required.').t(),
        }, {
            pattern: /^[\d]+$/,
            msg: _('Retention must be a positive integer.').t(),
        }],
    },
});
