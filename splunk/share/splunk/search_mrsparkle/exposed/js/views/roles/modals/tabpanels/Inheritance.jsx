import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@splunk/react-ui/Menu';
import Table from '@splunk/react-ui/Table';
import Text from '@splunk/react-ui/Text';
import { _ } from '@splunk/ui-utils/i18n';

const Inheritance = props => (
    <div>
        <div data-test-name="inheritance-table-help">
            {_('Specify roles from which this role inherits capabilities and indexes. ' +
                'Inherited capabilities and indexes cannot be disabled. If multiple roles ' +
                'are specified, this role inherits capabilities and indexes from all selected roles.')}
        </div>
        <Table
            stripeRows
            data-test-name="inheritance-table"
            onRequestToggleAllRows={props.handleRolesToggleAll}
            rowSelection={props.rowRolesSelectionState(props.roles)}
        >
            <Table.Head>
                <Table.HeadCell data-test-name="inheritance-table-head-name">
                    {_('Role name')}
                    <Text
                        inline
                        style={{ marginLeft: '10px' }}
                        placeholder="filter"
                        name="name"
                        onChange={(e, data) => props.handleRolesFiltering(data)}
                        canClear
                    />
                </Table.HeadCell>
                <Table.HeadDropdownCell data-test-name="inheritance-table-menu">
                    <Menu>
                        <Menu.Item
                            selectable
                            data-test-name="inheritance-table-menu-item"
                            selected={props.menuSelected === 'selected'}
                            onClick={() => props.handleRolesFiltering({ name: 'selected' })}
                        >
                            {_('Show selected')}
                        </Menu.Item>
                        <Menu.Item
                            selectable
                            data-test-name="inheritance-table-menu-item"
                            selected={props.menuSelected === 'unselected'}
                            onClick={() => props.handleRolesFiltering({ name: 'unselected' })}
                        >
                            {_('Show unselected')}
                        </Menu.Item>
                        <Menu.Item
                            selectable
                            data-test-name="inheritance-table-menu-item"
                            selected={props.menuSelected === 'all'}
                            onClick={() => props.handleRolesFiltering({ name: 'all' })}
                        >
                            {_('Show all')}
                        </Menu.Item>
                    </Menu>
                </Table.HeadDropdownCell>
            </Table.Head>
            <Table.Body data-test-name="inheritance-table-body">
                {props.roles.map(row => (
                    row.filtered &&
                    <Table.Row
                        key={row.name}
                        data-test-name="inheritance-table-row"
                        onRequestToggle={props.handleRolesToggle}
                        data={row}
                        selected={!!row.selected}
                    >
                        <Table.Cell
                            key={row.name}
                            data-test-name="inheritance-table-cell"
                        >
                            {row.name}
                        </Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
);

Inheritance.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rowRolesSelectionState: PropTypes.func.isRequired,
    menuSelected: PropTypes.string.isRequired,
    handleRolesToggleAll: PropTypes.func.isRequired,
    handleRolesFiltering: PropTypes.func.isRequired,
    handleRolesToggle: PropTypes.func.isRequired,
};

export default Inheritance;