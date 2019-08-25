import React from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import Modal from '@splunk/react-ui/Modal';
import { _ } from '@splunk/ui-utils/i18n';
import ViewCapabilities from '@splunk/view-capabilities';

const ViewCapabilitiesModal = props => (
    <div>
        <Modal
            data-test-name="view-capabilities-modal"
            onRequestClose={props.handleClose}
            open={props.open}
            style={{ width: '80%' }}
        >
            <Modal.Header
                data-test-name="view-capabilities-modal-header"
                title={_('View Capabilities')}
                onRequestClose={props.handleClose}
            />
            <Modal.Body
                data-test-name="view-capabilities-modal-body"
                style={{ backgroundColor: '#f2f5f4', paddingTop: 0 }}
            >
                <ViewCapabilities
                    entityType={props.entityType}
                    entity={props.entity}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    data-test-name="view-capabilities-cancel"
                    onClick={props.handleClose}
                    label={_('Cancel')}
                />
            </Modal.Footer>
        </Modal>
    </div>
);


ViewCapabilitiesModal.propTypes = {
    open: PropTypes.bool,
    entityType: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
};

ViewCapabilitiesModal.defaultProps = {
    open: false,
};

export default ViewCapabilitiesModal;