import React from 'react';
import PropTypes from 'prop-types';
import { _ } from '@splunk/ui-utils/i18n';
import Modal from '@splunk/react-ui/Modal';
import Button from '@splunk/react-ui/Button';
import Message from '@splunk/react-ui/Message';

const DisableTokenAuthModal = props => (
    <Modal
        open={props.open}
        onRequestClose={props.handleClose}
        style={{ minWidth: '500px' }}
        data-test-name="DisableTokenAuthModal"
    >
        <Modal.Header
            title={_('Disable Token Authentication')}
            onRequestClose={props.handleClose}
            data-test-name="DisableTokenAuthModal.Header"
        />
        <Modal.Body data-test-name="DisableTokenAuthModal.Body">
            {props.errorMessage && (
                <Message
                    type="error"
                    data-test-name="DisableTokenAuthModal.ErrorMsg"
                >
                    {props.errorMessage}
                </Message>)
            }
            <div>
                {_('Are you sure you want to disable token authentication? All tokens will be disabled,' +
                ' regardless of their individual status.')}
            </div>
        </Modal.Body>
        <Modal.Footer data-test-name="DisableTokenAuthModal.Footer">
            <Button
                onClick={props.handleClose}
                label={_('Cancel')}
                data-test-name="DisableTokenAuthModal.CancelBtn"
                autoFocus
            />
            <Button
                label={props.isWorking ? _('Disabling...') : _('Disable')}
                onClick={props.handleToggleTokenAuth}
                data-test-name="DisableTokenAuthModal.SubmitBtn"
                appearance="primary"
            />
        </Modal.Footer>
    </Modal>
);

DisableTokenAuthModal.propTypes = {
    open: PropTypes.bool,
    isWorking: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    handleToggleTokenAuth: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

DisableTokenAuthModal.defaultProps = {
    open: false,
    isWorking: false,
    errorMessage: '',
};
export default DisableTokenAuthModal;