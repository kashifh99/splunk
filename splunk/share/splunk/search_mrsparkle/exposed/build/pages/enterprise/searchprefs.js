!function(modules){function webpackJsonpCallback(data){for(var moduleId,chunkId,chunkIds=data[0],moreModules=data[1],executeModules=data[2],i=0,resolves=[];i<chunkIds.length;i++)chunkId=chunkIds[i],installedChunks[chunkId]&&resolves.push(installedChunks[chunkId][0]),installedChunks[chunkId]=0;for(moduleId in moreModules)Object.prototype.hasOwnProperty.call(moreModules,moduleId)&&(modules[moduleId]=moreModules[moduleId]);for(parentJsonpFunction&&parentJsonpFunction(data);resolves.length;)resolves.shift()();return deferredModules.push.apply(deferredModules,executeModules||[]),checkDeferredModules()}function checkDeferredModules(){for(var result,i=0;i<deferredModules.length;i++){for(var deferredModule=deferredModules[i],fulfilled=!0,j=1;j<deferredModule.length;j++){var depId=deferredModule[j];0!==installedChunks[depId]&&(fulfilled=!1)}fulfilled&&(deferredModules.splice(i--,1),result=__webpack_require__(__webpack_require__.s=deferredModule[0]))}return result}var installedModules={},installedChunks={60:0},deferredModules=[];function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.e=function(chunkId){var promises=[],installedChunkData=installedChunks[chunkId];if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else{var promise=new Promise(function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]});promises.push(installedChunkData[2]=promise);var onScriptComplete,head=document.getElementsByTagName("head")[0],script=document.createElement("script");script.charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.src=function(chunkId){return __webpack_require__.p+""+({}[chunkId]||chunkId)+".js"}(chunkId),onScriptComplete=function(event){script.onerror=script.onload=null,clearTimeout(timeout);var chunk=installedChunks[chunkId];if(0!==chunk){if(chunk){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src,error=new Error("Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")");error.type=errorType,error.request=realSrc,chunk[1](error)}installedChunks[chunkId]=void 0}};var timeout=setTimeout(function(){onScriptComplete({type:"timeout",target:script})},12e4);script.onerror=script.onload=onScriptComplete,head.appendChild(script)}return Promise.all(promises)},__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__.oe=function(err){throw console.error(err),err};var jsonpArray=window.webpackJsonp=window.webpackJsonp||[],oldJsonpFunction=jsonpArray.push.bind(jsonpArray);jsonpArray.push=webpackJsonpCallback,jsonpArray=jsonpArray.slice();for(var i=0;i<jsonpArray.length;i++)webpackJsonpCallback(jsonpArray[i]);var parentJsonpFunction=oldJsonpFunction;deferredModules.push([1795,0]),checkDeferredModules()}({1795:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__.p=function(){function getConfigValue(key,defaultValue){if(window.$C&&window.$C.hasOwnProperty(key))return window.$C[key];if(void 0!==defaultValue)return defaultValue;throw new Error("getConfigValue - "+key+" not set, no default provided")}return function(){for(var seg,len,output="",i=0,l=arguments.length;i<l;i++)(len=(seg=arguments[i].toString()).length)>1&&"/"==seg.charAt(len-1)&&(seg=seg.substring(0,len-1)),"/"!=seg.charAt(0)?output+="/"+seg:output+=seg;if("/"!=output){var segments=output.split("/"),firstseg=segments[1];if("static"==firstseg||"modules"==firstseg){var postfix=output.substring(firstseg.length+2,output.length);output="/"+firstseg,window.$C.BUILD_NUMBER&&(output+="/@"+window.$C.BUILD_NUMBER),window.$C.BUILD_PUSH_NUMBER&&(output+="."+window.$C.BUILD_PUSH_NUMBER),"app"==segments[2]&&(output+=":"+getConfigValue("APP_BUILD",0)),output+="/"+postfix}}var root=getConfigValue("MRSPARKLE_ROOT_PATH","/"),combinedPath="/"+getConfigValue("LOCALE","en-US")+output;return""==root||"/"==root?combinedPath:root+combinedPath}("/static/build/pages/enterprise")+"/"}(),__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__("routers/Searchprefs"),__webpack_require__("util/router_utils")],void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(SearchprefsRouter,router_utils){new SearchprefsRouter;router_utils.start_backbone_history()}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)},"models/shared/ConcurrencySettings":function(module,exports,__webpack_require__){"use strict";__webpack_require__(2),Object.defineProperty(exports,"__esModule",{value:!0});var _jquery2=_interopRequireDefault(__webpack_require__("shim/jquery")),_SplunkDBase2=_interopRequireDefault(__webpack_require__("models/SplunkDBase")),_backbone2=_interopRequireDefault(__webpack_require__("require/backbone")),_splunkd_utils2=_interopRequireDefault(__webpack_require__("util/splunkd_utils"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=_SplunkDBase2.default.extend({url:_splunkd_utils2.default.fullpath("search/concurrency-settings"),sync:function(method,model,options){var defaults={data:{output_mode:"json"},processData:!0};return _jquery2.default.extend(!0,defaults,options),_backbone2.default.sync.call(null,method,model,defaults)},getMaxSearchesPerc:function(){return this.entry.content.has("max_searches_perc")?this.entry.content.get("max_searches_perc"):"unknown"},getAutoSummaryPerc:function(){return this.entry.content.has("auto_summary_perc")?this.entry.content.get("auto_summary_perc"):"unknown"}}),module.exports=exports.default},"models/shared/SearchConcurrency":function(module,exports,__webpack_require__){"use strict";__webpack_require__(2),Object.defineProperty(exports,"__esModule",{value:!0});var _jquery2=_interopRequireDefault(__webpack_require__("shim/jquery")),_SplunkDBase2=_interopRequireDefault(__webpack_require__("models/SplunkDBase")),_backbone2=_interopRequireDefault(__webpack_require__("require/backbone")),_splunkd_utils2=_interopRequireDefault(__webpack_require__("util/splunkd_utils"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=_SplunkDBase2.default.extend({url:_splunkd_utils2.default.fullpath("server/status/limits/search-concurrency"),sync:function(method,model,options){var defaults={data:{output_mode:"json"},processData:!0};return _jquery2.default.extend(!0,defaults,options),_backbone2.default.sync.call(null,method,model,defaults)},getMaxHistScheduledSearches:function(){return this.entry.content.has("max_hist_scheduled_searches")?this.entry.content.get("max_hist_scheduled_searches"):"unknown"},getMaxAutoSummarySearches:function(){return this.entry.content.has("max_auto_summary_searches")?this.entry.content.get("max_auto_summary_searches"):"unknown"}}),module.exports=exports.default},"routers/Searchprefs":function(module,exports,__webpack_require__){"use strict";__webpack_require__(2),Object.defineProperty(exports,"__esModule",{value:!0});var _classCallCheck3=_interopRequireDefault(__webpack_require__(9)),_createClass3=_interopRequireDefault(__webpack_require__(10)),_possibleConstructorReturn3=_interopRequireDefault(__webpack_require__(12)),_inherits3=_interopRequireDefault(__webpack_require__(13)),_react2=_interopRequireDefault(__webpack_require__(3)),_jquery2=_interopRequireDefault(__webpack_require__("shim/jquery")),_reactDom=__webpack_require__(50),_i18n=__webpack_require__(7),_Base2=_interopRequireDefault(__webpack_require__("routers/Base")),_SearchPrefs2=_interopRequireDefault(__webpack_require__("views/SearchPrefs")),_ConcurrencySettings2=_interopRequireDefault(__webpack_require__("models/shared/ConcurrencySettings")),_SearchConcurrency2=_interopRequireDefault(__webpack_require__("models/shared/SearchConcurrency"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SearchPrefsRouter=function(_BaseRouter){function SearchPrefsRouter(){return(0,_classCallCheck3.default)(this,SearchPrefsRouter),(0,_possibleConstructorReturn3.default)(this,(SearchPrefsRouter.__proto__||Object.getPrototypeOf(SearchPrefsRouter)).apply(this,arguments))}return(0,_inherits3.default)(SearchPrefsRouter,_BaseRouter),(0,_createClass3.default)(SearchPrefsRouter,[{key:"initialize",value:function(){for(var _BaseRouter$prototype,_len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];(_BaseRouter$prototype=_Base2.default.prototype.initialize).call.apply(_BaseRouter$prototype,[this].concat(args)),this.enableAppBar=!1,this.setPageTitle((0,_i18n._)("Search Preferences")),this.fetchConcurrencyInfo()}},{key:"fetchConcurrencyInfo",value:function(){this.model.concurrencySettings=new _ConcurrencySettings2.default,this.deferreds.concurrencySettings=this.model.concurrencySettings.fetch(),this.model.searchConcurrency=new _SearchConcurrency2.default,this.deferreds.searchConcurrency=this.model.searchConcurrency.fetch()}},{key:"page",value:function(){for(var _BaseRouter$prototype2,_this2=this,_len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];(_BaseRouter$prototype2=_Base2.default.prototype.page).call.apply(_BaseRouter$prototype2,[this].concat(args)),_jquery2.default.when(this.deferreds.pageViewRendered,this.deferreds.userPref,this.deferreds.concurrencySettings,this.deferreds.searchConcurrency).done(function(){(0,_jquery2.default)(".preload").replaceWith(_this2.pageView.el);var props={userPrefs:_this2.model.userPref,application:_this2.model.application,concurrencySettings:_this2.model.concurrencySettings,searchConcurrency:_this2.model.searchConcurrency};(0,_reactDom.render)(_react2.default.createElement(_SearchPrefs2.default,props),document.getElementsByClassName("main-section-body")[0])})}}]),SearchPrefsRouter}(_Base2.default);exports.default=SearchPrefsRouter,module.exports=exports.default},"views/SearchPrefs":function(module,exports,__webpack_require__){"use strict";(function(fetch){__webpack_require__(2),Object.defineProperty(exports,"__esModule",{value:!0});var _extends3=_interopRequireDefault(__webpack_require__(6)),_classCallCheck3=_interopRequireDefault(__webpack_require__(9)),_createClass3=_interopRequireDefault(__webpack_require__(10)),_possibleConstructorReturn3=_interopRequireDefault(__webpack_require__(12)),_inherits3=_interopRequireDefault(__webpack_require__(13)),_i18n=__webpack_require__(7),_react=__webpack_require__(3),_react2=_interopRequireDefault(_react),_propTypes2=_interopRequireDefault(__webpack_require__(4)),_querystring2=_interopRequireDefault(__webpack_require__(51)),_format=__webpack_require__(27),_fetch=__webpack_require__(41),_url=__webpack_require__(40),_Dropdown2=_interopRequireDefault(__webpack_require__(175)),_SplunkwebConnector2=_interopRequireDefault(__webpack_require__(383)),_Button2=_interopRequireDefault(__webpack_require__(14)),_ControlGroup2=_interopRequireDefault(__webpack_require__(19)),_Heading2=_interopRequireDefault(__webpack_require__(80)),_Link2=_interopRequireDefault(__webpack_require__(33)),_Message2=_interopRequireDefault(__webpack_require__(24)),_Number2=_interopRequireDefault(__webpack_require__(106)),_Paragraph2=_interopRequireDefault(__webpack_require__(55)),_route2=_interopRequireDefault(__webpack_require__("uri/route"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SearchPrefs=function(_Component){function SearchPrefs(props,context){(0,_classCallCheck3.default)(this,SearchPrefs);var _this=(0,_possibleConstructorReturn3.default)(this,(SearchPrefs.__proto__||Object.getPrototypeOf(SearchPrefs)).call(this,props,context));return _this.getButtonLabel=function(isWorking){return isWorking?(0,_i18n._)("Saving..."):(0,_i18n._)("Save")},_this.validateValue=function(value,minVal){var val=value;return(void 0===val||null===val||""===val||val<minVal)&&(val=minVal),val},_this.handleTimeRangeChange=function(e,_ref){var earliest=_ref.earliest,latest=_ref.latest;_this.setState({earliest:earliest,latest:latest,timeRangeChanged:!0})},_this.handleRelativeConcurrencyScheduledChange=function(e,_ref2){var value=_ref2.value,val=_this.validateValue(value,1);_this.setState({maxSearchesPerc:val,concurrencyChanged:!0})},_this.handleRelativeConcurrencySummarizationChange=function(e,_ref3){var value=_ref3.value,val=_this.validateValue(value,0);_this.setState({autoSummaryPerc:val,concurrencyChanged:!0})},_this.fetchPost=function(url,data,defaultError){return fetch((0,_url.createRESTURL)(url),(0,_extends3.default)({},_fetch.defaultFetchInit,{method:"POST",body:_querystring2.default.encode(data)})).then((0,_fetch.handleResponse)(200)).catch((0,_fetch.handleError)(defaultError))},_this.fetchGet=function(url,data,defaultError){return fetch((0,_url.createRESTURL)(""+url+_querystring2.default.encode(data)),(0,_extends3.default)({},_fetch.defaultFetchInit,{method:"GET"})).then((0,_fetch.handleResponse)(200)).catch((0,_fetch.handleError)(defaultError))},_this.saveTimeRange=function(){var data={default_earliest_time:_this.state.earliest,default_latest_time:_this.state.latest,output_mode:"json"},defaultError=(0,_i18n._)("Unable to save default search time range.");_this.fetchPost("data/user-prefs/general",data,defaultError).then(function(){_this.setState({isWorkingTimeRange:!1,errorMessageTimeRange:"",timeRangeChanged:!1})}).catch(function(res){_this.setState({isWorkingTimeRange:!1,errorMessageTimeRange:(0,_format.sprintf)("%s %s",defaultError,res.message),timeRangeChanged:!1})})},_this.fetchEffectiveSearchConcurrency=function(){var defaultError=(0,_i18n._)("Unable to fetch effective search concurrency.");_this.fetchGet("server/status/limits/search-concurrency?",{output_mode:"json"},defaultError).then(function(response){_this.setState({isWorkingConcurrency:!1,errorMessageConcurrencySettings:"",errorMessageSearchConcurrency:"",concurrencyChanged:!1,maxHistScheduledSearches:response.entry[0].content.max_hist_scheduled_searches,maxAutoSummarySearches:response.entry[0].content.max_auto_summary_searches})}).catch(function(res){_this.setState({isWorkingConcurrency:!1,errorMessageConcurrencySettings:"",errorMessageSearchConcurrency:(0,_format.sprintf)("%s %s",defaultError,res.message),concurrencyChanged:!1})})},_this.saveRelativeConcurrency=function(){var data={max_searches_perc:_this.state.maxSearchesPerc,auto_summary_perc:_this.state.autoSummaryPerc,output_mode:"json"},defaultError=(0,_i18n._)("Unable to save search concurrency changes.");_this.fetchPost("search/concurrency-settings/scheduler",data,defaultError).then(function(){_this.fetchEffectiveSearchConcurrency()}).catch(function(res){_this.setState({isWorkingConcurrency:!1,errorMessageConcurrencySettings:(0,_format.sprintf)("%s %s",defaultError,res.message),errorMessageSearchConcurrency:"",concurrencyChanged:!1})})},_this.handleSave=function(){_this.setState({isWorkingTimeRange:_this.state.timeRangeChanged,isWorkingConcurrency:_this.state.concurrencyChanged}),_this.state.timeRangeChanged&&_this.saveTimeRange(),_this.state.concurrencyChanged&&_this.saveRelativeConcurrency()},_this.state={earliest:props.userPrefs.entry.content.attributes.default_earliest_time,latest:props.userPrefs.entry.content.attributes.default_latest_time,parseEarliest:void 0,parseLatest:void 0,timeRangeChanged:!1,isWorkingTimeRange:!1,errorMessageTimeRange:_this.getErrorMessageTimeRange(),maxSearchesPerc:props.concurrencySettings.getMaxSearchesPerc(),autoSummaryPerc:props.concurrencySettings.getAutoSummaryPerc(),concurrencyChanged:!1,isWorkingConcurrency:!1,errorMessageConcurrencySettings:_this.getErrorMessageConcurrencySettings(),maxHistScheduledSearches:props.searchConcurrency.getMaxHistScheduledSearches(),maxAutoSummarySearches:props.searchConcurrency.getMaxAutoSummarySearches(),errorMessageSearchConcurrency:_this.getErrorMessageSearchConcurrency()},_this}return(0,_inherits3.default)(SearchPrefs,_Component),(0,_createClass3.default)(SearchPrefs,[{key:"getErrorMessageTimeRange",value:function(){return this.props.userPrefs.entry.content.attributes.default_earliest_time&&this.props.userPrefs.entry.content.attributes.default_latest_time?"":(0,_i18n._)("Trouble fetching default search time range.")}},{key:"getErrorMessageConcurrencySettings",value:function(){return"unknown"===this.props.concurrencySettings.getMaxSearchesPerc()||"unknown"===this.props.concurrencySettings.getAutoSummaryPerc()?(0,_i18n._)("Trouble fetching relative search concurrency limits."):""}},{key:"getErrorMessageSearchConcurrency",value:function(){return"unknown"===this.props.searchConcurrency.getMaxHistScheduledSearches()||"unknown"===this.props.searchConcurrency.getMaxAutoSummarySearches()?(0,_i18n._)("Trouble fetching effective search concurrency values."):""}},{key:"makeDocLink",value:function(location){return _route2.default.docHelp(this.props.application.get("root"),this.props.application.get("locale"),location)}},{key:"render",value:function(){var serverSettingsLink=_route2.default.manager(this.props.application.get("root"),this.props.application.get("locale"),"system","systemsettings"),timeRangeHelpText=_react2.default.createElement("span",null,(0,_i18n._)("This time range is used as the default time range for searches. "),_react2.default.createElement(_Link2.default,{to:this.makeDocLink("learnmore.search.time_range_picker.global.default"),openInNewContext:!0},(0,_i18n._)("Learn More"))),relativeConcurrencyScheduledHelpText=_react2.default.createElement("span",null,(0,_i18n._)("The maximum number of searches the scheduler can run, as a percentage of the\n                    maximum number of concurrent searches. Default value is 50%. "),_react2.default.createElement(_Link2.default,{to:this.makeDocLink("learnmore.relative.concurrency.scheduled.searches"),openInNewContext:!0},(0,_i18n._)("Learn More"))),relativeConcurrencySummarizationHelpText=_react2.default.createElement("span",null,(0,_i18n._)("The maximum number of concurrent searches to be allocated for auto summarization,\n                    as a percentage of the concurrent searches that the scheduler can run.\n                    Auto summary searches include: searches which generate the data for the Report \n                    Acceleration feature or for Data Model acceleration. Note: user scheduled searches\n                    take precedence over auto summary searches. Default value is 50%. "),_react2.default.createElement(_Link2.default,{to:this.makeDocLink("learnmore.relative.concurrency.summarization.searches"),openInNewContext:!0},(0,_i18n._)("Learn More")));return _react2.default.createElement("div",{"data-test-name":"searchprefs",style:{paddingLeft:"20px",paddingRight:"20px"}},_react2.default.createElement(_Heading2.default,{level:1,"data-test-name":"searchprefs-heading"},(0,_i18n._)("Search preferences")),_react2.default.createElement(_Paragraph2.default,{"data-test-name":"breadcrumb"},_react2.default.createElement(_Link2.default,{to:serverSettingsLink,"data-test-name":"breadcrumb-link"},(0,_i18n._)("Server settings")),(0,_i18n._)(" » Search preferences")),_react2.default.createElement("div",{"data-test-name":"searchprefs-content",style:{background:"white",width:"960px",margin:"20px auto",padding:"20px"}},this.state.errorMessageTimeRange&&_react2.default.createElement(_Message2.default,{type:"error","data-test-name":"time-range-error"},this.state.errorMessageTimeRange),this.state.errorMessageConcurrencySettings&&_react2.default.createElement(_Message2.default,{type:"error","data-test-name":"concurrency-settings-error"},this.state.errorMessageConcurrencySettings),this.state.errorMessageSearchConcurrency&&_react2.default.createElement(_Message2.default,{type:"error","data-test-name":"search-concurrency-error"},this.state.errorMessageSearchConcurrency),_react2.default.createElement(_ControlGroup2.default,{label:(0,_i18n._)("Default search time range"),labelPosition:"top",help:timeRangeHelpText,controlsLayout:"none","data-test-name":"searchprefs-time-range-picker"},_react2.default.createElement(_SplunkwebConnector2.default,null,_react2.default.createElement(_Dropdown2.default,{onChange:this.handleTimeRangeChange,earliest:this.state.earliest,latest:this.state.latest,labelMaxChars:1/0,documentationURL:this.makeDocLink("learnmore.search.time_range_picker.global.default")}))),_react2.default.createElement("hr",null),_react2.default.createElement(_ControlGroup2.default,{label:(0,_i18n._)("Relative concurrency limit for scheduled searches"),labelPosition:"top",help:relativeConcurrencyScheduledHelpText,controlsLayout:"none","data-test-name":"relative-concurrency-scheduled-searches"},_react2.default.createElement(_Number2.default,{value:this.state.maxSearchesPerc,max:100,min:1,roundTo:0,step:1,onChange:this.handleRelativeConcurrencyScheduledChange,inline:!0})),_react2.default.createElement(_Paragraph2.default,{"data-test-name":"effective-scheduled-searches"},(0,_format.sprintf)((0,_i18n._)("This results in an effective concurrency limit for scheduled searches of %s."),this.state.maxHistScheduledSearches)),_react2.default.createElement(_ControlGroup2.default,{label:(0,_i18n._)("Relative concurrency limit for summarization searches"),labelPosition:"top",help:relativeConcurrencySummarizationHelpText,controlsLayout:"none","data-test-name":"relative-concurrency-summarization-searches"},_react2.default.createElement(_Number2.default,{value:this.state.autoSummaryPerc,max:100,min:0,roundTo:0,step:1,onChange:this.handleRelativeConcurrencySummarizationChange,inline:!0})),_react2.default.createElement(_Paragraph2.default,{"data-test-name":"effective-summary-searches"},(0,_format.sprintf)((0,_i18n._)("This results in an effective concurrency limit for summarization searches of %s."),this.state.maxAutoSummarySearches)),_react2.default.createElement("hr",null)," ",_react2.default.createElement(_Paragraph2.default,{"data-test-name":"searchprefs-non-warning",style:{textAlign:"left"}},(0,_i18n._)("Saving changes to the default time range or concurrency\n                            limits does not trigger a restart.")),_react2.default.createElement("div",{"data-test-name":"searchprefs-buttons",style:{textAlign:"right"}},_react2.default.createElement(_Button2.default,{appearance:"primary","data-test-name":"save-btn",disabled:this.state.isWorkingTimeRange||this.state.isWorkingConcurrency,label:this.getButtonLabel(this.state.isWorkingTimeRange||this.state.isWorkingConcurrency),onClick:this.handleSave}))))}}]),SearchPrefs}(_react.Component);SearchPrefs.propTypes={userPrefs:_propTypes2.default.shape({entry:_propTypes2.default.shape({content:_propTypes2.default.shape({attributes:_propTypes2.default.shape({default_earliest_time:_propTypes2.default.string.isRequired,default_latest_time:_propTypes2.default.string.isRequired})})})}).isRequired,application:_propTypes2.default.shape({get:_propTypes2.default.func.isRequired}).isRequired,concurrencySettings:_propTypes2.default.shape({getMaxSearchesPerc:_propTypes2.default.func.isRequired,getAutoSummaryPerc:_propTypes2.default.func.isRequired}).isRequired,searchConcurrency:_propTypes2.default.shape({getMaxHistScheduledSearches:_propTypes2.default.func.isRequired,getMaxAutoSummarySearches:_propTypes2.default.func.isRequired}).isRequired},SearchPrefs.defaultProps={},exports.default=SearchPrefs,module.exports=exports.default}).call(this,__webpack_require__(35))}});