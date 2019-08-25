!function(modules){function webpackJsonpCallback(data){for(var moduleId,chunkId,chunkIds=data[0],moreModules=data[1],executeModules=data[2],i=0,resolves=[];i<chunkIds.length;i++)chunkId=chunkIds[i],installedChunks[chunkId]&&resolves.push(installedChunks[chunkId][0]),installedChunks[chunkId]=0;for(moduleId in moreModules)Object.prototype.hasOwnProperty.call(moreModules,moduleId)&&(modules[moduleId]=moreModules[moduleId]);for(parentJsonpFunction&&parentJsonpFunction(data);resolves.length;)resolves.shift()();return deferredModules.push.apply(deferredModules,executeModules||[]),checkDeferredModules()}function checkDeferredModules(){for(var result,i=0;i<deferredModules.length;i++){for(var deferredModule=deferredModules[i],fulfilled=!0,j=1;j<deferredModule.length;j++){var depId=deferredModule[j];0!==installedChunks[depId]&&(fulfilled=!1)}fulfilled&&(deferredModules.splice(i--,1),result=__webpack_require__(__webpack_require__.s=deferredModule[0]))}return result}var installedModules={},installedChunks={38:0},deferredModules=[];function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.e=function(chunkId){var promises=[],installedChunkData=installedChunks[chunkId];if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else{var promise=new Promise(function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]});promises.push(installedChunkData[2]=promise);var onScriptComplete,head=document.getElementsByTagName("head")[0],script=document.createElement("script");script.charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.src=function(chunkId){return __webpack_require__.p+""+({}[chunkId]||chunkId)+".js"}(chunkId),onScriptComplete=function(event){script.onerror=script.onload=null,clearTimeout(timeout);var chunk=installedChunks[chunkId];if(0!==chunk){if(chunk){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src,error=new Error("Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")");error.type=errorType,error.request=realSrc,chunk[1](error)}installedChunks[chunkId]=void 0}};var timeout=setTimeout(function(){onScriptComplete({type:"timeout",target:script})},12e4);script.onerror=script.onload=onScriptComplete,head.appendChild(script)}return Promise.all(promises)},__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__.oe=function(err){throw console.error(err),err};var jsonpArray=window.webpackJsonp=window.webpackJsonp||[],oldJsonpFunction=jsonpArray.push.bind(jsonpArray);jsonpArray.push=webpackJsonpCallback,jsonpArray=jsonpArray.slice();for(var i=0;i<jsonpArray.length;i++)webpackJsonpCallback(jsonpArray[i]);var parentJsonpFunction=oldJsonpFunction;deferredModules.push([1679,0]),checkDeferredModules()}({1679:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__.p=function(){function getConfigValue(key,defaultValue){if(window.$C&&window.$C.hasOwnProperty(key))return window.$C[key];if(void 0!==defaultValue)return defaultValue;throw new Error("getConfigValue - "+key+" not set, no default provided")}return function(){for(var seg,len,output="",i=0,l=arguments.length;i<l;i++)(len=(seg=arguments[i].toString()).length)>1&&"/"==seg.charAt(len-1)&&(seg=seg.substring(0,len-1)),"/"!=seg.charAt(0)?output+="/"+seg:output+=seg;if("/"!=output){var segments=output.split("/"),firstseg=segments[1];if("static"==firstseg||"modules"==firstseg){var postfix=output.substring(firstseg.length+2,output.length);output="/"+firstseg,window.$C.BUILD_NUMBER&&(output+="/@"+window.$C.BUILD_NUMBER),window.$C.BUILD_PUSH_NUMBER&&(output+="."+window.$C.BUILD_PUSH_NUMBER),"app"==segments[2]&&(output+=":"+getConfigValue("APP_BUILD",0)),output+="/"+postfix}}var root=getConfigValue("MRSPARKLE_ROOT_PATH","/"),combinedPath="/"+getConfigValue("LOCALE","en-US")+output;return""==root||"/"==root?combinedPath:root+combinedPath}("/static/build/pages/lite")+"/"}(),__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__("routers/Error"),__webpack_require__("util/router_utils")],void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(ErrorRouter,router_utils){new ErrorRouter;router_utils.start_backbone_history()}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)},"routers/Error":function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__("require/underscore"),__webpack_require__("shim/jquery"),__webpack_require__("routers/Base"),__webpack_require__("models/services/server/ServerInfo"),__webpack_require__("models/shared/Error"),__webpack_require__("views/error/Master")],void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(_,$,BaseRouter,ServerInfoModel,ErrorModel,ErrorView){return BaseRouter.extend({routes:{":locale/*splat":"page"},initialize:function(){BaseRouter.prototype.initialize.apply(this,arguments),this.enableAppBar=!1,this.enableSplunkBar=!1,this.model.error=new ErrorModel,this.model.serverInfo=new ServerInfoModel,this.deferreds.error=$.Deferred(),this.deferreds.serverInfo=$.Deferred()},page:function(locale,splat){BaseRouter.prototype.page.call(this,locale,"search",""),this.updateErrorModel(),$.when(this.deferreds.error).then(function(){var status=this.model.error.get("status");if(status&&-1!=status.indexOf("402")){status="Restricted by License",this.model.error.set("status","Restricted by License")}this.setPageTitle(_(status).t())}.bind(this)),$.when(this.deferreds.error,this.deferreds.serverInfo,this.deferreds.pageViewRendered).then(function(){this.shouldRender&&(this.initializeErrorView(),$(".preload").replaceWith(this.pageView.el),this.errorView.render().replaceContentsOf($(".main-section-body")))}.bind(this))},updateErrorModel:function(){"resolved"!=this.deferreds.error.state()&&("undefined"!=typeof __error_status__?(this.model.error.set("message",__error_status__.message),this.model.error.set("status",__error_status__.status)):(this.model.error.set("message",_("An unknown error has occurred.").t()),this.model.error.set("status",_("Error").t())),this.deferreds.error.resolve())},initializeErrorView:function(){this.errorView||(this.errorView=new ErrorView({model:{error:this.model.error,application:this.model.application,serverInfo:this.model.serverInfo}}))}})}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}});