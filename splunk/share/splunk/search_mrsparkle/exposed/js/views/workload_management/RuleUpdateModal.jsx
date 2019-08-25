import _ from 'underscore';
import { createTestHook } from 'util/test_support';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Modal from '@splunk/react-ui/Modal';
import P from '@splunk/react-ui/Paragraph';
import Text from '@splunk/react-ui/Text';
import Select from '@splunk/react-ui/Select';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';

const RuleUpdateModal = (props) => {
    const {
        ruleUpdateModalOpen,
        ruleUpdateModalState,
        handleRuleUpdateModalClose,
        handleRuleUpdateModalTextChange,
        handleRuleUpdateModalSubmit,
    } = props;

    return (
        <div {...createTestHook(module.id)} className="workload-rule-update-modal">
            <Modal
                onRequestClose={handleRuleUpdateModalClose}
                open={ruleUpdateModalOpen}
                style={{ width: '500px' }}
            >
                <Modal.Header
                    title={ruleUpdateModalState.title}
                    onRequestClose={handleRuleUpdateModalClose}
                />
                <Modal.Body>
                    <P />
                    { ruleUpdateModalState.edit ?
                        <ControlGroup
                            label={_('Order').t()}
                            data-test="RuleUpdateOrder"
                            tooltip={_('Order of workload rule').t()}
                            help={ruleUpdateModalState.orderErrorMsg}
                            error={ruleUpdateModalState.orderError}
                        >
                            <Text
                                disabled={ruleUpdateModalState.wait}
                                error={ruleUpdateModalState.orderError}
                                value={ruleUpdateModalState.order}
                                name="order"
                                onChange={handleRuleUpdateModalTextChange}
                                autoComplete={false}
                            />
                        </ControlGroup> :
                        <ControlGroup
                            label={_('Name').t()}
                            data-test="RuleUpdateName"
                            tooltip={_('Name of workload rule').t()}
                            help={ruleUpdateModalState.nameErrorMsg}
                            error={ruleUpdateModalState.nameError}
                        >
                            <Text
                                disabled={ruleUpdateModalState.wait}
                                error={ruleUpdateModalState.nameError}
                                value={ruleUpdateModalState.name}
                                name="name"
                                onChange={handleRuleUpdateModalTextChange}
                                autoComplete={false}
                            />
                        </ControlGroup>
                    }
                    <ControlGroup
                        label={_('Predicate').t()}
                        data-test="RuleUpdatePredicate"
                        tooltip={_('Enter logical expression with predicate as <type>=<value>. ' +
                            'Valid <type> are "app", "role", "user" and "index". ' +
                            'e.g. app=search AND (NOT index=_internal)').t()}
                    >
                        <Text
                            disabled={ruleUpdateModalState.wait}
                            value={ruleUpdateModalState.predicate}
                            name="predicate"
                            onChange={handleRuleUpdateModalTextChange}
                            autoComplete={false}
                        />
                    </ControlGroup>
                    <ControlGroup
                        label={_('Workload Pool').t()}
                        data-test="RuleUpdateWLPool"
                        tooltip={_('Workload pool that this rule matches to').t()}
                        error={ruleUpdateModalState.poolError}
                        help={ruleUpdateModalState.poolErrorMsg}
                    >
                        <Select
                            disabled={ruleUpdateModalState.wait}
                            value={ruleUpdateModalState.workload_pool}
                            name="workload_pool"
                            onChange={handleRuleUpdateModalTextChange}
                        >
                            {ruleUpdateModalState.available_pools.map(option => (
                                <Select.Option
                                    key={option.id}
                                    label={option.getName()}
                                    value={option.getName()}
                                />
                            ))}
                        </Select>
                    </ControlGroup>
                </Modal.Body>
                { ruleUpdateModalState.wait ?
                    <Modal.Footer>
                        <WaitSpinner size="medium" />
                    </Modal.Footer> :
                    <Modal.Footer>
                        <Button
                            appearance="secondary"
                            onClick={handleRuleUpdateModalClose}
                            label={_('Cancel').t()}
                        />
                        <Button
                            disabled={
                                ruleUpdateModalState.nameError
                                || ruleUpdateModalState.orderError
                                || !ruleUpdateModalState.changed
                            }
                            appearance="primary"
                            onClick={handleRuleUpdateModalSubmit}
                            label={_('Submit').t()}
                        />
                    </Modal.Footer>
                }
            </Modal>
        </div>
    );
};

RuleUpdateModal.propTypes = {
    ruleUpdateModalOpen: PropTypes.bool,
    ruleUpdateModalState: PropTypes.shape({}).isRequired,
    handleRuleUpdateModalClose: PropTypes.func.isRequired,
    handleRuleUpdateModalTextChange: PropTypes.func.isRequired,
    handleRuleUpdateModalSubmit: PropTypes.func.isRequired,
};

RuleUpdateModal.defaultProps = {
    ruleUpdateModalOpen: false,
};

export default RuleUpdateModal;
