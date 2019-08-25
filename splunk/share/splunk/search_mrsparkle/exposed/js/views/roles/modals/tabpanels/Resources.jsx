import React from 'react';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import PropTypes from 'prop-types';
import Select from '@splunk/react-ui/Select';
import Text from '@splunk/react-ui/Text';
import { has } from 'lodash';
import { _ } from '@splunk/ui-utils/i18n';

const Resources = props => (
    <div>
        <ControlGroup
            labelPosition="top"
            label={_('Default app')}
            data-test-name="default-app-control-group"
        >
            <Select
                filter
                data-test-name="default-app-control"
                value={props.defaultApp}
                onChange={props.handleAppChange}
            >
                {
                    props.apps.map(app => (
                        <Select.Option
                            key={app.value}
                            label={app.value}
                            value={app.value}
                        />))
                }
            </Select>
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            data-test-name="restrict-search-terms-cg"
            label={_('Restrict search terms')}
            help={_('Can include only source, host, index, event type, source type, search fields, ' +
             '“*”, “AND”, and “OR”. Example: “host=web* OR source=/var/log/*”')}
        >
            <Text
                data-test-name="restrict-search-terms-text"
                name="srchFilter"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'srchFilter') ?
                    `${props.resources.srchFilter}` : null}
            />
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            label={_('Restrict search time range')}
            data-test-name="restrict-search-time-cg"
            help={_('Set a time window, in seconds, for searches for this role. ' +
             'For example, set to \'60\' to restrict searches for this role to ' +
              '1 minute before the most recent time specified in the search. ' +
               'You can set the time window to \'0\' to make it infinite, or \'-1\' ' +
                'to disable it. Inherited roles can override this setting.')}
        >
            <Text
                name="srchTimeWin"
                data-test-name="restrict-search-time-text"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'srchTimeWin') ?
                    `${props.resources.srchTimeWin}` : null}
            />
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            data-test-name="srchJobsQuota-cg"
            label={_('User-level concurrent search job limit')}
            help={_('Set the maximum number of concurrent search jobs for each user of this role.')}
        >
            <Text
                name="srchJobsQuota"
                data-test-name="srchJobsQuota-text"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'srchJobsQuota') ?
                    `${props.resources.srchJobsQuota}` : null}
            />
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            data-test-name="rtSrchJobsQuota-cg"
            label={_('User-level concurrent real-time search job limit')}
            help={_('Set the maximum number of concurrent real-time search jobs for each user' +
             ' of this role. This count is independent of the standard search job limit.')}
        >
            <Text
                name="rtSrchJobsQuota"
                data-test-name="rtSrchJobsQuota-text"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'rtSrchJobsQuota') ?
                    `${props.resources.rtSrchJobsQuota}` : null}
            />
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            data-test-name="cumulativeSrchJobsQuota-cg"
            label={_('Role-level concurrent search job limit')}
            help={_('Set the maximum number of cumulative concurrent search jobs for this role.')}
        >
            <Text
                name="cumulativeSrchJobsQuota"
                data-test-name="cumulativeSrchJobsQuota-text"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'cumulativeSrchJobsQuota') ?
                    `${props.resources.cumulativeSrchJobsQuota}` : null}
            />
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            data-test-name="cumulativeRTSrchJobsQuota-cg"
            label={_('Role-level concurrent real-time search job limit')}
            help={_('Set the maximum number of cumulative concurrent real-time search jobs ' +
             'for this role. This count is independent from the standard search job limit.')}
        >
            <Text
                name="cumulativeRTSrchJobsQuota"
                data-test-name="cumulativeRTSrchJobsQuota-text"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'cumulativeRTSrchJobsQuota') ?
                    `${props.resources.cumulativeRTSrchJobsQuota}` : null}
            />
        </ControlGroup>
        <ControlGroup
            labelPosition="top"
            data-test-name="srchDiskQuota-cg"
            label={_('Total search job disk quota')}
            help={_('Set the total disk space, in megabytes, that search jobs under a certain role' +
             ' can use. For example, \'100\' limits total disk usage by a role\'s search jobs to 100 MB.')}
        >
            <Text
                name="srchDiskQuota"
                data-test-name="srchDiskQuota-text"
                onChange={props.handleResourceChange}
                defaultValue={has(props.resources, 'srchDiskQuota') ?
                    `${props.resources.srchDiskQuota}` : null}
            />
        </ControlGroup>
    </div>
);

Resources.propTypes = {
    apps: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
    })).isRequired,
    handleAppChange: PropTypes.func.isRequired,
    defaultApp: PropTypes.string.isRequired,
    resources: PropTypes.shape({
        srchFilter: PropTypes.string,
        srchTimeWin: PropTypes.number,
        srchJobsQuota: PropTypes.number,
        rtSrchJobsQuota: PropTypes.number,
        cumulativeSrchJobsQuota: PropTypes.number,
        cumulativeRTSrchJobsQuota: PropTypes.number,
        srchDiskQuota: PropTypes.number,
    }),
    handleResourceChange: PropTypes.func.isRequired,
};

Resources.defaultProps = {
    resources: {
        srchFilter: null,
        srchTimeWin: null,
        srchJobsQuota: null,
        rtSrchJobsQuota: null,
        cumulativeSrchJobsQuota: null,
        cumulativeRTSrchJobsQuota: null,
        srchDiskQuota: null,
    },
};

export default Resources;