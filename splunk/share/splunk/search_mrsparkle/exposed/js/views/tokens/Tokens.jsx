import Main from '@splunk/base-lister/Main';
import React, { Component } from 'react';
import { _ } from '@splunk/ui-utils/i18n';
import Button from '@splunk/react-ui/Button';
import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import Link from '@splunk/react-ui/Link';
import PropTypes from 'prop-types';
import TokenActions from 'views/tokens/table/columns/TokenActions';
import CreateToken from 'views/tokens/modals/CreateToken';
import { formatLastUsedTime, formatTokenExp, formatTimestamp,
    getToggleTokenAuthURL, MAX_FILTER_LENGTH } from 'views/tokens/Utils';
import 'views/tokens/Tokens.pcss';
import TokensDisabled from 'views/tokens/TokensDisabled';
import DisableTokenAuthModal from 'views/tokens/modals/DisableTokenAuth';

class TokensManager extends Component {

    static propTypes = {
        ...Main.propTypes,
        callDeleteToken: PropTypes.func.isRequired,
        callChangeStatus: PropTypes.func.isRequired,
        callCreateToken: PropTypes.func.isRequired,
        callToggleTokenAuth: PropTypes.func.isRequired,
        showActionsColumn: PropTypes.bool.isRequired,
        showStatusColumn: PropTypes.bool.isRequired,
        tokenAuthEnabled: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        ...Main.defaultProps,
        showAppColumn: false,
        showOwnerColumn: false,
        showAppFilter: false,
        showOwnerFilter: false,
        showSharingColumn: false,
        hasRowExpansion: true,
        objectNamePlural: _('Tokens'),
        objectNameSingular: _('Token'),
        ColumnActions: TokenActions,
        ModalNew: CreateToken,
        customColumns: [
            {
                key: 'usernameCol',
                sortKey: 'claims.sub',
                label: _('Username'),
                content: object => object.content.claims.sub,
            },
            {
                key: 'audienceCol',
                sortKey: 'claims.aud',
                label: _('Audience'),
                content: object => object.content.claims.aud,
            },
            {
                key: 'issuedAtCol',
                sortKey: 'claims.iat',
                label: _('Issued At'),
                content: object => formatTimestamp(object.content.claims.iat),
            },
            {
                key: 'expirationCol',
                sortKey: 'claims.exp',
                label: _('Expiration'),
                content: object => formatTokenExp(object.content.claims.exp),
            },
            {
                key: 'lastUsed',
                sortKey: 'lastUsed',
                label: _('Last Used'),
                content: object => formatLastUsedTime(object.content.lastUsed),
            },
        ],

        /**
         * Overrriding the default method returning the fetch collection data.
         * Add conditional to check for listAll capability to build args for GET
         * @param {Object} state current state of the component
         * @param {Object} newData data that is being passed to handleRefreshListing but not
         * yet saved in the state.
         * @returns {Object} an object containing the fetch data necessary for the collection fetch.
         */
        getObjectsCollectionFetchData(state, newData) {
            const fetchArgs = {
                count: state.countPerPage,
                sort_key: state.sortKey,
                sort_dir: state.sortDirection,
                offset: state.offset,
                search: state.filterString ? state.filterString.substring(0, MAX_FILTER_LENGTH) : null,
                output_mode: 'json',
            };
            if (!this.permissions.listAll && !this.permissions.editAll) {
                fetchArgs.username = this.username;
            }
            const data = Object.assign(
                {},
                fetchArgs,
                newData);
            delete data.filterString;
            return data;
        },
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            /** Boolean indicating whether or not disableTokenAuth Modal is open */
            disableTokenAuthOpen: false,
            /** Boolean indicating whether the page is working (saving, deleting, ...). Used to disable button. */
            isWorking: false,
            /** Boolean indicating whether or not tokenAuth is enabled */
            tokenAuthEnabled: props.tokenAuthEnabled,
        };
    }

    /**
     * Set disableTokenAuthOpen to true on the state to track disableTokenAuth modal is open.
     */
    openDisableTokenAuthModal = () => {
        this.setState({ disableTokenAuthOpen: true });
    }

    /**
     * Set disableTokenAuthOpen to false on the state to track disableTokenAuth modal is closed.
     */
    handleDisableTokenAuthClose = () => {
        this.setState({
            isWorking: false,
            disableTokenAuthOpen: false,
            errorMessage: '',
        });
    };

    /**
     * Handle disabling of Tokens from Tokens Manager page. On success, close modal and set
     * state tokenAuthEnabled to opposite of previous value
     */
    handleToggleTokenAuth = () => {
        this.setState({ isWorking: true });
        this.props.callToggleTokenAuth(getToggleTokenAuthURL(this.state.tokenAuthEnabled)).then(() => {
            // Close disableTokenAuth modal, set isWorking to false, and
            // inverse the tokenAuthEnabled state to re-render the correct view
            this.setState(state => ({
                isWorking: false,
                disableTokenAuthOpen: false,
                errorMessage: '',
                tokenAuthEnabled: !state.tokenAuthEnabled,
            }));
        }, response => this.setState({ isWorking: false, errorMessage: response.message }));
    }

    render() {
        const bStyleLeft = {
            margin: '0 20px 0 20px',
            position: 'absolute',
            top: '155px',
        };
        const bStyleRight = {
            float: 'right',
            top: '20px',
            margin: '0 20px 0 10px',
        };

        return (
            this.state.tokenAuthEnabled ? (
                <div data-test-name="TokensManagerPage">
                    {this.props.permissions.editSettings &&
                          (<div>
                              <Button
                                  style={this.props.canViewTokens ? bStyleRight : bStyleLeft}
                                  label={_('Disable Token Authentication')}
                                  onClick={this.openDisableTokenAuthModal}
                                  data-test-name="TokensManagerPage.disableBtn"
                                  appearance={this.props.canViewTokens ? 'default' : 'primary'}
                              />
                              <DisableTokenAuthModal
                                  open={this.state.disableTokenAuthOpen}
                                  handleClose={this.handleDisableTokenAuthClose}
                                  errorMessage={this.state.errorMessage}
                                  handleToggleTokenAuth={this.handleToggleTokenAuth}
                                  isWorking={this.state.isWorking}
                              />
                          </div>)
                    }
                    { this.props.canViewTokens ?
                        (<Main {...this.props} />) :
                        (<div
                            style={{ padding: '20px 20px 0', maxWidth: '600px', display: 'block' }}
                            data-test-name="TokensManagerPage.editTokensSettingsOnly"
                        >
                            <Heading
                                level={1}
                                style={{ margin: '0 0 10px 0', lineHeight: '24px' }}
                                data-test-name="TokensManagerPage.Heading"
                            >
                                {_('Token authentication is currently enabled')}
                            </Heading>
                            <P data-test-name="TokensManagerPage.Paragraph">
                                {_('You don\'t have permission to manage individual tokens on this ' +
                                'instance, but there might be enabled tokens. If you click "Disable ' +
                                'Token Authentication", all currently enabled tokens are disabled. ' +
                                'If you need to manage individual tokens, contact your administrator. ')}
                                <Link
                                    to={this.props.learnMoreLink}
                                    data-test-name="TokensManagerPage.learnMoreLink"
                                    openInNewContext
                                >
                                    {_('Learn More')}
                                </Link>
                            </P>
                        </div>)
                    }
                </div>
            ) : (<TokensDisabled handleToggleTokenAuth={this.handleToggleTokenAuth} {...this.props} />)
        );
    }
}

export default TokensManager;
