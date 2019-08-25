import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _ } from '@splunk/ui-utils/i18n';
import Link from '@splunk/react-ui/Link';
import { sprintf } from '@splunk/ui-utils/format';
import DeleteRoleModal from '../modals/DeleteRole';
import ViewCapabilitiesModal from '../modals/ViewCapabilities';
import { getDeleteRoleUrl } from '../Utils';

/**
 * Actions column component. Maintains the state of all the actions.
 */
class RolesActions extends Component {
    /**
     * See base-lister/src/Main.jsx for propTypes definition.
     */
    static propTypes = {
        /** Represents a single role object */
        object: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        /** Name attribute of Role object */
        nameAttribute: PropTypes.string,
        /** Handler to update page after delete action */
        handleDeleteChange: PropTypes.func.isRequired,
        /** Handler to fetch the roles collection */
        handleRefreshListing: PropTypes.func.isRequired,
        /** REST call to Delete role */
        callDeleteRole: PropTypes.func.isRequired,
    };

    static defaultProps = {
        nameAttribute: 'name',
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            /** Boolean that controls the open/close of delete modal */
            isDeleteOpen: false,
            /** Boolean that controls the open/close of view capbilities modal */
            isViewCapsOpen: false,
            /** Boolean indicating whether the page is working (saving, deleting, ...). Used to disable button. */
            isWorking: false,
            /** String containing the error message, if any */
            errorMessage: '',
            /** Name of the role */
            title: this.props.object[this.props.nameAttribute] || '',
        };
    }

    /**
     * Set isDeleteOpen to true on the state to track delete modal is open.
     */
    handleDeleteModalOpen = () => {
        this.setState({
            isDeleteOpen: true,
        });
    }

    /**
     * Set isViewCapsOpen to true on the state to track capabilities modal is open.
     */
    handleViewCapabilitiesModalOpen = () => {
        this.setState({
            isViewCapsOpen: true,
        });
    }

    /**
     * Call the Delete Role endpoint and process the promise returned.
     */
    handleDelete = () => {
        this.setState({ isWorking: true });
        this.props.callDeleteRole(getDeleteRoleUrl(this.state.title))
            .then(() => {
                /**
                 * handleDeleteChange takes care of updating current page after the delete action.
                 * Pass 1 as argument to represent single deletion mode.
                 */
                this.props.handleDeleteChange(1);
                this.props.handleRefreshListing();
            }, response => this.setState({ isWorking: false, errorMessage: response.message }));
    }

    /**
     * Set isDeleteOpen to false on the state to track delete modal is closed.
     */
    handleDeleteClose = () => {
        this.setState({
            isDeleteOpen: false,
        });
    }

    /**
     * Set isViewCapsOpen to false on the state to track capabilities modal is closed.
     */
    handleViewCapsClose = () => {
        this.setState({
            isViewCapsOpen: false,
        });
    }

    render() {
        return (
            <div
                data-test-name="roles-actions-container"
                style={{
                    textAlign: 'left',
                    padding: '4px 12px',
                }}
            >
                <Link
                    data-test-name="view-capabilities"
                    key={'view'}
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={this.handleViewCapabilitiesModalOpen}
                >
                    {_('View Capabilities')}
                </Link>
                &nbsp;|&nbsp;
                <Link
                    data-test-name="delete-role"
                    key={'delete'}
                    onClick={this.handleDeleteModalOpen}
                >
                    {_('Delete')}
                </Link>
                <DeleteRoleModal
                    open={this.state.isDeleteOpen}
                    isWorking={this.state.isWorking}
                    errorMessage={this.state.errorMessage}
                    modalContent={sprintf(_('Are you sure you want to delete %s?'), this.state.title)}
                    handleDelete={this.handleDelete}
                    handleClose={this.handleDeleteClose}
                />
                <ViewCapabilitiesModal
                    open={this.state.isViewCapsOpen}
                    entityType="roles"
                    entity={this.state.title}
                    handleClose={this.handleViewCapsClose}
                />
            </div>
        );
    }
}

export default RolesActions;