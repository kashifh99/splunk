import React from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import Modal from '@splunk/react-ui/Modal';
import Message from '@splunk/react-ui/Message';
import { _ } from '@splunk/ui-utils/i18n';

const DeleteRole = props => (
    <div>
        <Modal
            data-test-name="delete-role-modal"
            onRequestClose={props.handleClose}
            open={props.open}
            style={{ width: '25%' }}
        >
            <Modal.Header
                data-test-name="delete-modal-header"
                title={_('Delete Role')}
                onRequestClose={props.handleClose}
            />
            <Modal.Body data-test-name="delete-modal-body">
                {props.errorMessage && (<Message type="error">{props.errorMessage}</Message>)}
                <div
                    data-test-name="delete-modal-content"
                    style={{ wordBreak: 'break-word' }}
                >
                    {props.modalContent}
                </div>
            </Modal.Body>
            <Modal.Footer data-test-name="delete-modal-footer">
                <Button
                    data-test-name="delete-cancel-btn"
                    onClick={props.handleClose}
                    label={_('Cancel')}
                />
                <Button
                    appearance="primary"
                    data-test-name="delete-btn"
                    disabled={props.isWorking}
                    onClick={props.handleDelete}
                    label={props.isWorking ? _('Deleting...') : _('Delete')}
                />
            </Modal.Footer>
        </Modal>
    </div>
);


DeleteRole.propTypes = {
    open: PropTypes.bool,
    isWorking: PropTypes.bool,
    modalContent: PropTypes.string,
    errorMessage: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

DeleteRole.defaultProps = {
    open: false,
    isWorking: false,
    modalContent: _('Are you sure you want to delete this role?'),
    errorMessage: '',
};

export default DeleteRole;