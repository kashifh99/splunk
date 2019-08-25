import React from 'react';
import PropTypes from 'prop-types';
import Table from '@splunk/react-ui/Table';
import Text from '@splunk/react-ui/Text';
import Menu from '@splunk/react-ui/Menu';
import { _ } from '@splunk/ui-utils/i18n';

const Capabilities = props => (
    <div>
        <div data-test-name="capabilities-help-text">
            {_('Select specific capabilities for this role. ' +
                'You must save the role before you can see its inherited capabilities.')}
        </div>
        <Table
            stripeRows
            data-test-name="capabilities-table"
            onRequestToggleAllRows={props.handleCapsToggleAll}
            rowSelection={props.rowRolesSelectionState(props.caps)}
        >
            <Table.Head>
                <Table.HeadCell data-test-name="capabilities-table-head">
                    {_('Capability Name')}
                    <Text
                        inline
                        style={{ marginLeft: '10px' }}
                        placeholder="filter"
                        name="name"
                        onChange={(e, data) => props.handleCapsFiltering(data)}
                        data-test-name="capabilities-table-filter"
                        canClear
                    />
                </Table.HeadCell>
                <Table.HeadDropdownCell
                    label={_('Source')}
                    data-test-name="capabilities-table-source"
                >
                    <Menu data-test-name="capabilities-table-menu">
                        <Menu.Item
                            selectable
                            data-test-name="capabilities-table-menu-item"
                            selected={props.menuSelected === 'native'}
                            onClick={() => props.handleCapsFiltering({ name: 'native' })}
                        >
                            {_('Show native only')}
                        </Menu.Item>
                        <Menu.Item
                            selectable
                            data-test-name="capabilities-table-menu-item"
                            selected={props.menuSelected === 'inherited'}
                            onClick={() => props.handleCapsFiltering({ name: 'inherited' })}
                        >
                            {_('Show inherited only')}
                        </Menu.Item>
                        <Menu.Divider data-test-name="capabilities-table-menu-divider" />
                        <Menu.Item
                            selectable
                            data-test-name="capabilities-table-menu-item"
                            selected={props.menuSelected === 'selected'}
                            onClick={() => props.handleCapsFiltering({ name: 'selected' })}
                        >
                            {_('Show selected')}
                        </Menu.Item>
                        <Menu.Item
                            selectable
                            data-test-name="capabilities-table-menu-item"
                            selected={props.menuSelected === 'unselected'}
                            onClick={() => props.handleCapsFiltering({ name: 'unselected' })}
                        >
                            {_('Show unselected')}
                        </Menu.Item>
                        <Menu.Item
                            selectable
                            data-test-name="capabilities-table-menu-item"
                            selected={props.menuSelected === 'all'}
                            onClick={() => props.handleCapsFiltering({ name: 'all' })}
                        >
                            {_('Show all')}
                        </Menu.Item>
                    </Menu>
                </Table.HeadDropdownCell>
            </Table.Head>
            <Table.Body data-test-name="capabilities-table-body" >
                {props.caps.map(row => (
                    row.filtered &&
                    <Table.Row
                        key={row.name}
                        data-test-name="capabilities-table-row"
                        onRequestToggle={props.handleCapsToggle}
                        data={row}
                        disabled={row.source === 'inherited'}
                        selected={row.selected}
                    >
                        <Table.Cell
                            key={row.name}
                            data-test-name="capabilities-name-cell"
                        >
                            {row.name}
                        </Table.Cell>
                        <Table.Cell
                            key={`${row.name}-${row.source}`}
                            data-test-name="capabilities-source-cell"
                        >
                            {row.source}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
);
Capabilities.propTypes = {
    caps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rowRolesSelectionState: PropTypes.func.isRequired,
    menuSelected: PropTypes.string.isRequired,
    handleCapsToggleAll: PropTypes.func.isRequired,
    handleCapsToggle: PropTypes.func.isRequired,
    handleCapsFiltering: PropTypes.func.isRequired,
};

export default Capabilities;