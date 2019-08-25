import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sprintf } from '@splunk/ui-utils/format';
import { _ } from '@splunk/ui-utils/i18n';
import Button from '@splunk/react-ui/Button';
import TabLayout from '@splunk/react-ui/TabLayout';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Message from '@splunk/react-ui/Message';
import Modal from '@splunk/react-ui/Modal';
import Text from '@splunk/react-ui/Text';
import ResourcePanel from './tabpanels/Resources';
import InheritancePanel from './tabpanels/Inheritance';
import CapabilitiesPanel from './tabpanels/Capabilities';
import IndexesPanel from './tabpanels/Indexes';
import * as Utils from '../Utils';

class AddEditRoles extends Component {
    /**
     * See base-lister/src/Main.jsx for propTypes definition.
     */
    static propTypes = {
        /**
         * 'action' parameter. Can be one of the following:
         *  - 'edit'              triggered from columns.Actions
         *  - 'new'               triggered from table.Header
         */
        action: PropTypes.oneOf(['new', 'edit']).isRequired,
        open: PropTypes.bool.isRequired,
        object: PropTypes.shape({
            name: PropTypes.string,
            content: PropTypes.shape({
                defaultApp: PropTypes.string,
                srchIndexesDefault: PropTypes.arrayOf(PropTypes.string),
                srchIndexesAllowed: PropTypes.arrayOf(PropTypes.string),
            }),
        }).isRequired,
        apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        objectNameSingular: PropTypes.string.isRequired,
        nameAttribute: PropTypes.string.isRequired,
        handleRequestClose: PropTypes.func.isRequired,
        callCreateRole: PropTypes.func.isRequired,
        callEditRole: PropTypes.func.isRequired,
        fetchAllCapabilities: PropTypes.func.isRequired,
        fetchAllRoles: PropTypes.func.isRequired,
        setShouldRefreshOnClose: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.indexListSearchJob = Utils.createSearchJob();
        this.state = {
            /** Boolean indicating whether the page is working (saving, deleting, ...). Used to disable button. */
            isWorking: false,
            /** String containing the error message, if any */
            errorMessage: '',
            /** Object maintaining all the properties under the resources tab */
            resources: {},
            /** Array of capabilities with UI specific properties */
            selectedCaps: [],
            /** Array of indices with UI specific properties */
            indexes: [],
            /** Array of all the roles (entire list) */
            roles: [],
            /** Dropdown menu selection in inheritance and capabilities */
            menuSelectionState: {
                inheritance: 'all',
                capabilities: 'all',
                indexes: 'all',
            },
            /** Title of the role */
            title: this.props.object[this.props.nameAttribute] || '',
            /** Default app for the role */
            defaultApp: this.props.object.content ? this.props.object.content.defaultApp : '',
            /** maintains the currently active tab */
            activePanelId: 'resources',
        };
    }

    componentDidMount() {
        /** Get all the roles to populate the inheritance tab */
        this.props.fetchAllRoles(Utils.getRolesUrl())
            .then((res) => {
                const roles = Utils.getRolesWithSelection(res.entry, this.props.object);
                this.setState({ roles });
            })
            .catch(res => this.setState({ errorMessage: res.message }));
        /** Get all the capabilities to populate the capabilities tab */
        this.props.fetchAllCapabilities(Utils.getCapabilitiesUrl())
            .then((res) => {
                const caps = res.entry[0].content.capabilities;
                const selectedCaps = Utils.getCapsWithSelection(caps, this.props.object);
                this.setState({ selectedCaps });
            })
            .catch(res => this.setState({ errorMessage: res.message }));
        /** Get the list of local and remote indexes from the search job results. */
        this.indexSrchJob = this.indexListSearchJob.getResults &&
            this.indexListSearchJob.getResults().subscribe((results) => {
                if (results.results && results.results.length) {
                    let indexes = [{ index: '*' }, { index: '_*' }, ...results.results];
                    indexes = Utils.getSelectedIndexes(indexes, this.props.object);
                    this.setState({
                        indexes,
                    });
                }
            });
    }

    componentWillUnmount = () => {
        if (this.indexSrchJob) {
            this.indexSrchJob.unsubscribe();
        }
    }

    /**
     * Handle the tab change event
     * @param {Event} e
     * @param {object} data
     */
    handleTabChange = (e, data) => {
        this.setState({ activePanelId: data.activePanelId });
    };

    /**
     * Success handler to be called when the Fetch call completes successfully.
     */
    handleSuccess = () => {
        this.props.setShouldRefreshOnClose();
        this.handleClose();
    };

    /**
     * Handles the toggle of roles
     * @param {Event} event
     * @param {String} name of the role to be toggled.
     */
    handleRolesToggle = (event, { name }) => {
        this.setState({
            roles: Utils.toggleSelected([...this.state.roles], { name }),
        });
    };

    /**
     * Handles the toggleAll selection for roles.
     */
    handleRolesToggleAll = () => {
        this.setState({
            roles: Utils.toggleAll(this.state.roles),
        });
    };

    /**
     * Handles toggling of capabilities.
     * @param {Event} event
     * @param {String} name of the capability to be toggled.
     */
    handleCapsToggle = (event, { name }) => {
        this.setState({
            selectedCaps: Utils.toggleSelected([...this.state.selectedCaps], { name }),
        });
    };

    /**
     * Handles the toggleAll selection for capabilities.
     */
    handleCapsToggleAll = () => {
        this.setState({
            selectedCaps: Utils.toggleAll(this.state.selectedCaps),
        });
    };

    /**
     * Handles toggling of Indexes.
     * @param {Event} event
     * @param {String} value - name of the index to be toggled.
     */
    handleIndexesToggle = (event, { value }) => {
        this.setState({
            indexes: Utils.toggleSelected([...this.state.indexes], value),
        });
    };

    /**
     * Handles filtering of indices by name or via dropdown menu selection.
     * @param {Object}
     * data = {
     *    name {string} required: <type of filtering>,
     *    value {string} [optional]: <value of the filter>
     * }.
     */
    handleIndexFiltering = (data) => {
        const menuSelectionState = this.state.menuSelectionState;
        menuSelectionState.indexes = data && data.name;
        this.setState({
            indexes: Utils.filterData(this.state.indexes, data.name, data.value),
            menuSelectionState,
        });
    };

    /**
     * Handles filtering of capabilities based on dropdown menu selection.
     * @param {Object}
     * data = {
     *    name {string} required: <type of filtering>,
     *    value {string} [optional]: <value of the filter>
     * }.
     */
    handleCapsFiltering = (data) => {
        const menuSelectionState = this.state.menuSelectionState;
        menuSelectionState.capabilities = data && data.name;
        this.setState({
            selectedCaps: Utils.filterData(this.state.selectedCaps, data.name, data.value),
            menuSelectionState,
        });
    };

    /**
     * Handles filtering of roles based on dropdown menu selection.
     * @param {Object}
     * data = {
     *    name {string} required: <type of filtering>,
     *    value {string} [optional]: <value of the filter>
     * }.
     */
    handleRolesFiltering = (data) => {
        const menuSelectionState = this.state.menuSelectionState;
        menuSelectionState.inheritance = data && data.name;
        this.setState({
            roles: Utils.filterData(this.state.roles, data.name, data.value),
            menuSelectionState,
        });
    };

    /**
     * Handler for successful create/edit fetch calls
     */
    handleSave = () => {
        this.setState({
            isWorking: true,
        });

        switch (this.props.action) {
            case 'new': {
                const data = {
                    name: this.state.title.trim(),
                    defaultApp: this.state.defaultApp,
                    output_mode: 'json',
                };
                this.props.callCreateRole(Utils.constructPostData(data, this.state))
                    .then(() => {
                        this.handleSuccess();
                    })
                    .catch((response) => {
                        this.setState({
                            isWorking: false,
                            errorMessage: response.message,
                        });
                    });
                break;
            }
            case 'edit': {
                const data = {
                    defaultApp: this.state.defaultApp,
                    output_mode: 'json',
                };
                this.props.callEditRole(this.props.object.name, Utils.constructPostData(data, this.state))
                    .then(() => {
                        this.handleSuccess();
                    })
                    .catch((response) => {
                        this.setState({
                            isWorking: false,
                            errorMessage: response.message,
                        });
                    });
                break;
            }
            default:
                break;
        }
    };

    /**
     * Handler for modal close action.
     */
    handleClose = () => {
        this.setState({
            isWorking: false,
            errorMessage: '',
        });
        this.props.handleRequestClose();
    };

    /**
     * Handles role title change
     * @param {Event} e
     * @param {String} value
     */
    handleTitleTextChange = (e, { value }) => {
        this.setState({
            title: value,
        });
    };

    /**
     * Handles any property change under resources tab
     * @param {Event} e
     * @param {String} name - name of the property
     * @param {String} value - value of the property
     */
    handleResourceChange = (e, { name, value }) => {
        const resources = this.state.resources;
        resources[name] = value;
        this.setState({
            resources,
        });
    };

    /**
     * Handles defaultApp selection
     * @param {Event} e
     * @param {String} value
     */
    handleAppChange = (e, { value }) => {
        this.setState({
            defaultApp: value,
        });
    };

    render() {
        const apps = this.props.apps.map(model => ({ value: model.entry.get('name') }));
        return (
            <Modal
                onRequestClose={this.handleClose}
                data-test-name="add-edit-role-modal"
                open={this.props.open}
                style={{ width: '75%' }}
            >
                <Modal.Header
                    title={sprintf('%s %s', Utils.getModalTitle(this.props.action),
                    this.props.objectNameSingular)}
                    data-test-name="add-edit-role-modal-header"
                    onRequestClose={this.handleClose}
                />
                <Modal.Body data-test-name="add-edit-role-modal-body">
                    {this.state.errorMessage && (
                        <Message type="error">{this.state.errorMessage}</Message>
                    )}
                    <ControlGroup
                        label={_('Name *')}
                        data-test-name="add-edit-role-name-cg"
                        tooltip={this.props.action === 'new' ? _('A role must have a name.')
                            : _('You cannot edit the name of an existing role.')}
                    >
                        <Text
                            data-test-name="add-edit-role-name-title"
                            canClear
                            autoFocus
                            disabled={this.props.action !== 'new'}
                            value={this.state.title}
                            onChange={this.handleTitleTextChange}
                        />
                    </ControlGroup>
                    <TabLayout
                        style={{ margin: 35 }}
                        data-test-name="add-edit-role-modal-tabs"
                        activePanelId={this.state.activePanelId}
                        onChange={this.handleTabChange}
                    >
                        <TabLayout.Panel
                            label={_('Resources')}
                            panelId="resources"
                            style={{ margin: 20 }}
                        >
                            <ResourcePanel
                                apps={apps}
                                defaultApp={this.state.defaultApp}
                                handleAppChange={this.handleAppChange}
                                resources={this.props.object.content}
                                handleResourceChange={this.handleResourceChange}
                            />
                        </TabLayout.Panel>
                        <TabLayout.Panel label={_('Inheritance')} panelId="inheritance" style={{ margin: 20 }}>
                            <InheritancePanel
                                roles={this.state.roles}
                                menuSelected={this.state.menuSelectionState.inheritance}
                                handleRolesFiltering={this.handleRolesFiltering}
                                rowRolesSelectionState={Utils.rowRolesSelectionState}
                                handleRolesToggleAll={this.handleRolesToggleAll}
                                handleRolesToggle={this.handleRolesToggle}
                            />
                        </TabLayout.Panel>
                        <TabLayout.Panel label={_('Capabilities')} panelId="capabilities" style={{ margin: 20 }}>
                            <CapabilitiesPanel
                                caps={this.state.selectedCaps}
                                menuSelected={this.state.menuSelectionState.capabilities}
                                rowRolesSelectionState={Utils.rowRolesSelectionState}
                                handleCapsToggleAll={this.handleCapsToggleAll}
                                handleCapsToggle={this.handleCapsToggle}
                                handleCapsFiltering={this.handleCapsFiltering}
                            />
                        </TabLayout.Panel>
                        <TabLayout.Panel label={_('Indexes')} panelId="indexes" style={{ margin: 20 }}>
                            <IndexesPanel
                                indexes={this.state.indexes}
                                handleIndexesToggle={this.handleIndexesToggle}
                                handleIndexFiltering={this.handleIndexFiltering}
                                menuSelected={this.state.menuSelectionState.indexes}
                            />
                        </TabLayout.Panel>
                    </TabLayout>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        data-test-name={'cancel-btn'}
                        onClick={this.handleClose}
                        label={_('Cancel')}
                    />
                    <Button
                        appearance="primary"
                        data-test-name={'save-btn'}
                        disabled={this.state.isWorking}
                        onClick={this.handleSave}
                        label={Utils.getButtonLabel(this.state.isWorking, this.props.action)}
                    />
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddEditRoles;