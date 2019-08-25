import { _ } from '@splunk/ui-utils/i18n';
import { find, has } from 'lodash';
import SearchJob from '@splunk/search-job';
import querystring from 'querystring';
import { createRESTURL } from '@splunk/splunk-utils/url';

export const ROLES_COLLECTION_PATH = createRESTURL('authorization/roles');
export const CAPABILITIES_COLLECTION_PATH = createRESTURL('authorization/grantable_capabilities');
export const MAX_FILTER_LENGTH = 250;

/**
 * Function that returns if source of a capability is native to that role or if it is inherited.
 * @param cap - String. Name of the capability
 * @param role - Object. Current role
 * @returns {String}
 */
export function getCapSource(cap, role) {
    if (role && role.content) {
        if (role.content.imported_capabilities && role.content.imported_capabilities.indexOf(cap) > -1) {
            return _('inherited');
        } else if (role.content.capabilities && role.content.capabilities.indexOf(cap) > -1) {
            return _('native');
        }
        return '';
    }
    return '';
}
/**
 * Create a search job to get all the local and remote indexes.
 * @returns {SearchJob}
 */
export function createSearchJob() {
    return SearchJob.create({
        search: '| eventcount summarize=false index=* index=_* | dedup index | head 1000',
    });
}
/**
 * Function that returns roles with filtered and selected flag to be used under
 * Inheritance tab in the add/edit roles dialog.
 * @param roles - Array of roles fetched from authorization/roles
 * @param currentRole - current role object being created/edited.
 * @returns {[objects]} - Array of roles objects
 */
export function getRolesWithSelection(roles, currentRole) {
    return roles && roles.map(role => ({
        name: role.name,
        filtered: true,
        selected: (currentRole && currentRole.content &&
            currentRole.content.imported_roles.indexOf(role.name) > -1),
    }));
}
/**
 * Function that returns capabilities with ui specific properties to be used under
 * Capabilities tab under add/edit roles dialog.
 * @param {[objects]} caps - Array of capabilities fetched from authorization/capabilities.
 * @param {object} currentRole - current role object being created/edited.
 * @returns {[objects]} - Array of capabilities
 */
export function getCapsWithSelection(caps, currentRole) {
    return caps && caps.map(cap => ({
        name: cap,
        filtered: true,
        source: getCapSource(cap, currentRole),
        selected: (currentRole && currentRole.content &&
            (currentRole.content.imported_capabilities.indexOf(cap) > -1 ||
                currentRole.content.capabilities.indexOf(cap) > -1)),
    }));
}
/**
 * Function that returns indices with ui specific properties to be used under
 * Indexes tab under add/edit roles dialog.
 * @param {[objects]} indexes - Array of capabilities fetched from authorization/capabilities.
 * @param {object} currentRole - current role object being created/edited.
 * @returns {[objects]} - Array of capabilities
 */
export function getSelectedIndexes(indexes, currentRole) {
    return indexes && indexes.map((index) => {
        if (index.index === '*' || index.index === '_*') {
            return ({
                name: index.index,
                filtered: true,
                label: index.index === '*' ? _('All non-internal indexes') : _('All internal indexes'),
                imported_srchDefault: (currentRole && currentRole.content
                    && currentRole.content.imported_srchIndexesDefault.indexOf(index.index) > -1),
                imported_srchAllowed: (currentRole && currentRole.content
                    && currentRole.content.imported_srchIndexesAllowed.indexOf(index.index) > -1),
                srchDefault: (currentRole &&
                    currentRole.content && currentRole.content.srchIndexesDefault.indexOf(index.index) > -1),
                srchAllowed: (currentRole &&
                    currentRole.content && currentRole.content.srchIndexesAllowed.indexOf(index.index) > -1),
            });
        }
        return ({
            name: index.index,
            filtered: true,
            imported_srchDefault: (currentRole && currentRole.content
                && currentRole.content.imported_srchIndexesDefault.indexOf(index.index) > -1),
            imported_srchAllowed: (currentRole && currentRole.content
                && currentRole.content.imported_srchIndexesAllowed.indexOf(index.index) > -1),
            srchDefault: (currentRole && currentRole.content &&
                currentRole.content.srchIndexesDefault.indexOf(index.index) > -1),
            srchAllowed: (currentRole && currentRole.content &&
                currentRole.content.srchIndexesAllowed.indexOf(index.index) > -1),
        });
    });
}
/**
 * Function that returns the title of the add/edit roles dialog.
 * @param {String} action - either 'new' or 'edit'
 * @returns {String/null} - returns string with accepted action string. null otherwise.
 */
export function getModalTitle(action) {
    switch (action) {
        case 'new':
            return _('New');
        case 'edit':
            return _('Edit');
        default:
            return null;
    }
}
/**
 * Function that returns the label of the primary button on add/edit roles dialog.
 * @param {String} action - either 'new' or 'edit'
 * @param {Boolean} isWorking - Bool to indicate if the create/edit fetch call is in progress.
 * @returns {String}
 */
export function getButtonLabel(isWorking, action) {
    if (isWorking) {
        switch (action) {
            case 'new':
                return _('Creating...');
            default:
                return _('Saving...');
        }
    } else {
        switch (action) {
            case 'new':
                return _('Create');
            default:
                return _('Save');
        }
    }
}
/**
 * Function that returns the data object to POST to the create/edit roles endpoint.
 * @param {object} pData - Initial post data to work with.
 * @param resources - All the properties under the Resources tab in create/edit dialog.
 * @param roles - Selected roles under the Inheritance tab in create/edit dialog.
 * @param selectedCaps - selected capabilities under the Capabilities tab in create/edit dialog.
 * @param indexes - selected default and allowed indices under the Indexes tab in create/edit dialog.
 * @returns {object} - final post data.
 */
export function constructPostData(pData, { resources, roles, selectedCaps, indexes }) {
    const postData = pData;
    Object.keys(resources).forEach((key) => {
        postData[key] = resources[key];
    });
    const importedRoles = roles.filter(role => role.selected);
    const capabilities = selectedCaps.filter(cap => cap.selected && cap.source !== 'inherited');
    const srchIndexesDefault = indexes.filter(index => index.srchDefault);
    const srchIndexesAllowed = indexes.filter(index => index.srchAllowed);
    postData.imported_roles = (importedRoles.length > 0) ? importedRoles.map(role => role.name) : '';
    postData.capabilities = (capabilities.length > 0) ? capabilities.map(cap => cap.name) : '';
    postData.srchIndexesDefault = (srchIndexesDefault.length > 0) ?
        srchIndexesDefault.map(ind => ind.name) : '';
    postData.srchIndexesAllowed = (srchIndexesAllowed.length > 0) ?
        srchIndexesAllowed.map(ind => ind.name) : '';
    return postData;
}
/**
 * Function that returns one of ['none', 'all, 'some'] to represent toggleAll checkbox
 * @param {[objects]} data
 * @returns {String}
 */
export function rowRolesSelectionState(data) {
    if (data) {
        const selectedCount = data.reduce((count, { selected }) => (selected ? count + 1 : count), 0);
        if (selectedCount === 0) {
            return 'none';
        } else if (selectedCount === data.length) {
            return 'all';
        }
        return 'some';
    }
    return 'none';
}

/**
 * Construct the url to call the Delete role endpoint.
 * @param {String} title
 * @returns {String}
 */
export function getDeleteRoleUrl(title) {
    const data = { output_mode: 'json' };
    return createRESTURL(
        `${ROLES_COLLECTION_PATH}/${encodeURIComponent(title)}?${querystring.encode(data)}`);
}
/**
 * Construct the url to call the Capabilities endpoint.
 * @returns {String}
 */
export function getCapabilitiesUrl() {
    const data = { output_mode: 'json' };
    return createRESTURL(
        `${CAPABILITIES_COLLECTION_PATH}?${querystring.encode(data)}`);
}
/**
 * Construct the url to call the Roles endpoint.
 * @returns {String}
 */
export function getRolesUrl() {
    const data = { count: -1, output_mode: 'json' };
    return createRESTURL(
        `${ROLES_COLLECTION_PATH}?${querystring.encode(data)}`);
}
/**
 * Function that toggles the row to selected/un-selected.
 * @param {[objects]} data
 * @param {String} name - name of the object to toggle selection
 * @param {string} type - name of the property in the object to toggle.
 * @returns {[objects]}
 */
export function toggleSelected(data, { name, type = null }) {
    const selected = find(data, { name });
    if (selected) {
        if (type) {
            selected[type] = !selected[type];
        } else {
            selected.selected = !selected.selected;
        }
    }
    return data;
}
/**
 * Function to toggle all the rows in the table.
 * @param {[objects]} data
 * @returns {[objects]} array of object with the selected property toggled for all rows.
 */
export function toggleAll(data) {
    const state = rowRolesSelectionState(data);
    const selected = state !== 'all';
    const result = data.map(row => ({ ...row, selected }));
    return result;
}
/**
 * Function to filter data based on the name input.
 * @param {[objects]} data
 * @param {String} name - Specifies what type of filtering should be done.
 * @param {String} value - Required to filter by name.
 * @returns {[objects]}
 */
export function filterData(data, name, value = '') {
    return data.map((ind) => {
        switch (name) {
            case 'selected':
                return ({
                    ...ind,
                    filtered: has(ind, 'srchDefault') ? (ind.srchDefault ||
                        ind.srchAllowed || ind.imported_srchDefault || ind.imported_srchAllowed)
                        : !!ind.selected,
                });
            case 'unselected':
                return ({
                    ...ind,
                    filtered: !ind.selected,
                });
            case 'native':
                return ({
                    ...ind,
                    filtered: (ind.source === 'native'),
                });
            case 'inherited':
                return ({
                    ...ind,
                    filtered: has(ind, 'srchDefault') ?
                        (ind.imported_srchDefault || ind.imported_srchAllowed)
                        : (ind.source === 'inherited'),
                });
            case 'uninherited':
                return ({
                    ...ind,
                    filtered: (!!ind.srchDefault || !!ind.srchAllowed),
                });
            case 'name':
                return ({
                    ...ind,
                    filtered: (ind.name.indexOf(value) !== -1),
                });
            default:
                return ({
                    ...ind,
                    filtered: true,
                });
        }
    });
}
