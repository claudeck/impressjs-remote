/*
 RequireJS 1.0.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(){function J(a){return N.call(a)==="[object Function]"}function F(a){return N.call(a)==="[object Array]"}function Z(a,c,l){for(var j in c)if(!(j in K)&&(!(j in a)||l))a[j]=c[j];return d}function O(a,c,d){a=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+a);if(d)a.originalError=d;return a}function $(a,c,d){var j,k,s;for(j=0;s=c[j];j++){s=typeof s==="string"?{name:s}:s;k=s.location;if(d&&(!k||k.indexOf("/")!==0&&k.indexOf(":")===-1))k=d+"/"+(k||s.name);a[s.name]={name:s.name,location:k||
s.name,main:(s.main||"main").replace(ea,"").replace(aa,"")}}}function U(a,c){a.holdReady?a.holdReady(c):c?a.readyWait+=1:a.ready(!0)}function fa(a){function c(b,f){var g,m;if(b&&b.charAt(0)===".")if(f){q.pkgs[f]?f=[f]:(f=f.split("/"),f=f.slice(0,f.length-1));g=b=f.concat(b.split("/"));var a;for(m=0;a=g[m];m++)if(a===".")g.splice(m,1),m-=1;else if(a==="..")if(m===1&&(g[2]===".."||g[0]===".."))break;else m>0&&(g.splice(m-1,2),m-=2);m=q.pkgs[g=b[0]];b=b.join("/");m&&b===g+"/"+m.main&&(b=g)}else b.indexOf("./")===
0&&(b=b.substring(2));return b}function l(b,f){var g=b?b.indexOf("!"):-1,m=null,a=f?f.name:null,h=b,e,d;g!==-1&&(m=b.substring(0,g),b=b.substring(g+1,b.length));m&&(m=c(m,a));b&&(m?e=(g=n[m])&&g.normalize?g.normalize(b,function(b){return c(b,a)}):c(b,a):(e=c(b,a),d=F[e],d||(d=i.nameToUrl(b,null,f),F[e]=d)));return{prefix:m,name:e,parentMap:f,url:d,originalName:h,fullName:m?m+"!"+(e||""):e}}function j(){var b=!0,f=q.priorityWait,g,a;if(f){for(a=0;g=f[a];a++)if(!r[g]){b=!1;break}b&&delete q.priorityWait}return b}
function k(b,f,g){return function(){var a=ga.call(arguments,0),c;if(g&&J(c=a[a.length-1]))c.__requireJsBuild=!0;a.push(f);return b.apply(null,a)}}function s(b,f,g){f=k(g||i.require,b,f);Z(f,{nameToUrl:k(i.nameToUrl,b),toUrl:k(i.toUrl,b),defined:k(i.requireDefined,b),specified:k(i.requireSpecified,b),isBrowser:d.isBrowser});return f}function p(b){var f,g,a,c=b.callback,h=b.map,e=h.fullName,ba=b.deps;a=b.listeners;if(c&&J(c)){if(q.catchError.define)try{g=d.execCb(e,b.callback,ba,n[e])}catch(j){f=j}else g=
d.execCb(e,b.callback,ba,n[e]);if(e)(c=b.cjsModule)&&c.exports!==void 0&&c.exports!==n[e]?g=n[e]=b.cjsModule.exports:g===void 0&&b.usingExports?g=n[e]:(n[e]=g,G[e]&&(S[e]=!0))}else e&&(g=n[e]=c,G[e]&&(S[e]=!0));if(w[b.id])delete w[b.id],b.isDone=!0,i.waitCount-=1,i.waitCount===0&&(I=[]);delete L[e];if(d.onResourceLoad&&!b.placeholder)d.onResourceLoad(i,h,b.depArray);if(f)return g=(e?l(e).url:"")||f.fileName||f.sourceURL,a=f.moduleTree,f=O("defineerror",'Error evaluating module "'+e+'" at location "'+
g+'":\n'+f+"\nfileName:"+g+"\nlineNumber: "+(f.lineNumber||f.line),f),f.moduleName=e,f.moduleTree=a,d.onError(f);for(f=0;c=a[f];f++)c(g)}function t(b,f){return function(g){b.depDone[f]||(b.depDone[f]=!0,b.deps[f]=g,b.depCount-=1,b.depCount||p(b))}}function o(b,f){var g=f.map,a=g.fullName,c=g.name,h=M[b]||(M[b]=n[b]),e;if(!f.loading)f.loading=!0,e=function(b){f.callback=function(){return b};p(f);r[f.id]=!0;z()},e.fromText=function(b,f){var g=P;r[b]=!1;i.scriptCount+=1;i.fake[b]=!0;g&&(P=!1);d.exec(f);
g&&(P=!0);i.completeLoad(b)},a in n?e(n[a]):h.load(c,s(g.parentMap,!0,function(b,a){var c=[],e,m;for(e=0;m=b[e];e++)m=l(m,g.parentMap),b[e]=m.fullName,m.prefix||c.push(b[e]);f.moduleDeps=(f.moduleDeps||[]).concat(c);return i.require(b,a)}),e,q)}function x(b){w[b.id]||(w[b.id]=b,I.push(b),i.waitCount+=1)}function C(b){this.listeners.push(b)}function u(b,f){var g=b.fullName,a=b.prefix,c=a?M[a]||(M[a]=n[a]):null,h,e;g&&(h=L[g]);if(!h&&(e=!0,h={id:(a&&!c?N++ +"__p@:":"")+(g||"__r@"+N++),map:b,depCount:0,
depDone:[],depCallbacks:[],deps:[],listeners:[],add:C},A[h.id]=!0,g&&(!a||M[a])))L[g]=h;a&&!c?(g=l(a),a in n&&!n[a]&&(delete n[a],delete Q[g.url]),a=u(g,!0),a.add(function(){var f=l(b.originalName,b.parentMap),f=u(f,!0);h.placeholder=!0;f.add(function(b){h.callback=function(){return b};p(h)})})):e&&f&&(r[h.id]=!1,i.paused.push(h),x(h));return h}function B(b,f,a,c){var b=l(b,c),d=b.name,h=b.fullName,e=u(b),j=e.id,k=e.deps,o;if(h){if(h in n||r[j]===!0||h==="jquery"&&q.jQuery&&q.jQuery!==a().fn.jquery)return;
A[j]=!0;r[j]=!0;h==="jquery"&&a&&V(a())}e.depArray=f;e.callback=a;for(a=0;a<f.length;a++)if(j=f[a])j=l(j,d?b:c),o=j.fullName,f[a]=o,o==="require"?k[a]=s(b):o==="exports"?(k[a]=n[h]={},e.usingExports=!0):o==="module"?e.cjsModule=k[a]={id:d,uri:d?i.nameToUrl(d,null,c):void 0,exports:n[h]}:o in n&&!(o in w)&&(!(h in G)||h in G&&S[o])?k[a]=n[o]:(h in G&&(G[o]=!0,delete n[o],Q[j.url]=!1),e.depCount+=1,e.depCallbacks[a]=t(e,a),u(j,!0).add(e.depCallbacks[a]));e.depCount?x(e):p(e)}function v(b){B.apply(null,
b)}function E(b,f){var a=b.map.fullName,c=b.depArray,d=!0,h,e,i,l;if(b.isDone||!a||!r[a])return l;if(f[a])return b;f[a]=!0;if(c){for(h=0;h<c.length;h++){e=c[h];if(!r[e]&&!ha[e]){d=!1;break}if((i=w[e])&&!i.isDone&&r[e])if(l=E(i,f))break}d||(l=void 0,delete f[a])}return l}function y(b,a){var g=b.map.fullName,c=b.depArray,d,h,e,i;if(!b.isDone&&g&&r[g]){if(g){if(a[g])return n[g];a[g]=!0}if(c)for(d=0;d<c.length;d++)if(h=c[d])if((e=l(h).prefix)&&(i=w[e])&&y(i,a),(e=w[h])&&!e.isDone&&r[h])h=y(e,a),b.depCallbacks[d](h);
return n[g]}}function D(){var b=q.waitSeconds*1E3,b=b&&i.startTime+b<(new Date).getTime(),a="",c=!1,l=!1,k=[],h,e;if(!(i.pausedCount>0)){if(q.priorityWait)if(j())z();else return;for(h in r)if(!(h in K)&&(c=!0,!r[h]))if(b)a+=h+" ";else if(l=!0,h.indexOf("!")===-1){k=[];break}else(e=L[h]&&L[h].moduleDeps)&&k.push.apply(k,e);if(c||i.waitCount){if(b&&a)return b=O("timeout","Load timeout for modules: "+a),b.requireType="timeout",b.requireModules=a,d.onError(b);if(l&&k.length)for(a=0;h=w[k[a]];a++)if(h=
E(h,{})){y(h,{});break}if(!b&&(l||i.scriptCount)){if((H||ca)&&!W)W=setTimeout(function(){W=0;D()},50)}else{if(i.waitCount){for(a=0;h=I[a];a++)y(h,{});i.paused.length&&z();X<5&&(X+=1,D())}X=0;d.checkReadyState()}}}}var i,z,q={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},catchError:{}},R=[],A={require:!0,exports:!0,module:!0},F={},n={},r={},w={},I=[],Q={},N=0,L={},M={},G={},S={},Y=0;V=function(b){if(!i.jQuery&&(b=b||(typeof jQuery!=="undefined"?jQuery:null))&&!(q.jQuery&&b.fn.jquery!==q.jQuery)&&("holdReady"in
b||"readyWait"in b))if(i.jQuery=b,v(["jquery",[],function(){return jQuery}]),i.scriptCount)U(b,!0),i.jQueryIncremented=!0};z=function(){var b,a,c,l,k,h;i.takeGlobalQueue();Y+=1;if(i.scriptCount<=0)i.scriptCount=0;for(;R.length;)if(b=R.shift(),b[0]===null)return d.onError(O("mismatch","Mismatched anonymous define() module: "+b[b.length-1]));else v(b);if(!q.priorityWait||j())for(;i.paused.length;){k=i.paused;i.pausedCount+=k.length;i.paused=[];for(l=0;b=k[l];l++)a=b.map,c=a.url,h=a.fullName,a.prefix?
o(a.prefix,b):!Q[c]&&!r[h]&&(d.load(i,h,c),c.indexOf("empty:")!==0&&(Q[c]=!0));i.startTime=(new Date).getTime();i.pausedCount-=k.length}Y===1&&D();Y-=1};i={contextName:a,config:q,defQueue:R,waiting:w,waitCount:0,specified:A,loaded:r,urlMap:F,urlFetched:Q,scriptCount:0,defined:n,paused:[],pausedCount:0,plugins:M,needFullExec:G,fake:{},fullExec:S,managerCallbacks:L,makeModuleMap:l,normalize:c,configure:function(b){var a,c,d;b.baseUrl&&b.baseUrl.charAt(b.baseUrl.length-1)!=="/"&&(b.baseUrl+="/");a=q.paths;
d=q.pkgs;Z(q,b,!0);if(b.paths){for(c in b.paths)c in K||(a[c]=b.paths[c]);q.paths=a}if((a=b.packagePaths)||b.packages){if(a)for(c in a)c in K||$(d,a[c],c);b.packages&&$(d,b.packages);q.pkgs=d}if(b.priority)c=i.requireWait,i.requireWait=!1,z(),i.require(b.priority),z(),i.requireWait=c,q.priorityWait=b.priority;if(b.deps||b.callback)i.require(b.deps||[],b.callback)},requireDefined:function(b,a){return l(b,a).fullName in n},requireSpecified:function(b,a){return l(b,a).fullName in A},require:function(b,
c,g){if(typeof b==="string"){if(J(c))return d.onError(O("requireargs","Invalid require call"));if(d.get)return d.get(i,b,c);c=l(b,c);b=c.fullName;return!(b in n)?d.onError(O("notloaded","Module name '"+c.fullName+"' has not been loaded yet for context: "+a)):n[b]}(b&&b.length||c)&&B(null,b,c,g);if(!i.requireWait)for(;!i.scriptCount&&i.paused.length;)z();return i.require},takeGlobalQueue:function(){T.length&&(ia.apply(i.defQueue,[i.defQueue.length-1,0].concat(T)),T=[])},completeLoad:function(b){var a;
for(i.takeGlobalQueue();R.length;)if(a=R.shift(),a[0]===null){a[0]=b;break}else if(a[0]===b)break;else v(a),a=null;a?v(a):v([b,[],b==="jquery"&&typeof jQuery!=="undefined"?function(){return jQuery}:null]);d.isAsync&&(i.scriptCount-=1);z();d.isAsync||(i.scriptCount-=1)},toUrl:function(b,a){var c=b.lastIndexOf("."),d=null;c!==-1&&(d=b.substring(c,b.length),b=b.substring(0,c));return i.nameToUrl(b,d,a)},nameToUrl:function(b,a,g){var l,k,h,e,j=i.config,b=c(b,g&&g.fullName);if(d.jsExtRegExp.test(b))a=
b+(a?a:"");else{l=j.paths;k=j.pkgs;g=b.split("/");for(e=g.length;e>0;e--)if(h=g.slice(0,e).join("/"),l[h]){g.splice(0,e,l[h]);break}else if(h=k[h]){b=b===h.name?h.location+"/"+h.main:h.location;g.splice(0,e,b);break}a=g.join("/")+(a||".js");a=(a.charAt(0)==="/"||a.match(/^\w+:/)?"":j.baseUrl)+a}return j.urlArgs?a+((a.indexOf("?")===-1?"?":"&")+j.urlArgs):a}};i.jQueryCheck=V;i.resume=z;return i}function ja(){var a,c,d;if(B&&B.readyState==="interactive")return B;a=document.getElementsByTagName("script");
for(c=a.length-1;c>-1&&(d=a[c]);c--)if(d.readyState==="interactive")return B=d;return null}var ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/require\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/^\.\//,aa=/\.js$/,N=Object.prototype.toString,t=Array.prototype,ga=t.slice,ia=t.splice,H=!!(typeof window!=="undefined"&&navigator&&document),ca=!H&&typeof importScripts!=="undefined",ma=H&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,da=typeof opera!=="undefined"&&opera.toString()==="[object Opera]",
K={},C={},T=[],B=null,X=0,P=!1,ha={require:!0,module:!0,exports:!0},d,t={},I,x,u,D,o,v,E,A,y,V,W;if(typeof define==="undefined"){if(typeof requirejs!=="undefined")if(J(requirejs))return;else t=requirejs,requirejs=void 0;typeof require!=="undefined"&&!J(require)&&(t=require,require=void 0);d=requirejs=function(a,c,d){var j="_",k;!F(a)&&typeof a!=="string"&&(k=a,F(c)?(a=c,c=d):a=[]);if(k&&k.context)j=k.context;d=C[j]||(C[j]=fa(j));k&&d.configure(k);return d.require(a,c)};d.config=function(a){return d(a)};
require||(require=d);d.toUrl=function(a){return C._.toUrl(a)};d.version="1.0.5";d.jsExtRegExp=/^\/|:|\?|\.js$/;x=d.s={contexts:C,skipAsync:{}};if(d.isAsync=d.isBrowser=H)if(u=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0])u=x.head=D.parentNode;d.onError=function(a){throw a;};d.load=function(a,c,l){d.resourcesReady(!1);a.scriptCount+=1;d.attach(l,a,c);if(a.jQuery&&!a.jQueryIncremented)U(a.jQuery,!0),a.jQueryIncremented=!0};define=function(a,c,d){var j,k;
typeof a!=="string"&&(d=c,c=a,a=null);F(c)||(d=c,c=[]);!c.length&&J(d)&&d.length&&(d.toString().replace(ka,"").replace(la,function(a,d){c.push(d)}),c=(d.length===1?["require"]:["require","exports","module"]).concat(c));if(P&&(j=I||ja()))a||(a=j.getAttribute("data-requiremodule")),k=C[j.getAttribute("data-requirecontext")];(k?k.defQueue:T).push([a,c,d])};define.amd={multiversion:!0,plugins:!0,jQuery:!0};d.exec=function(a){return eval(a)};d.execCb=function(a,c,d,j){return c.apply(j,d)};d.addScriptToDom=
function(a){I=a;D?u.insertBefore(a,D):u.appendChild(a);I=null};d.onScriptLoad=function(a){var c=a.currentTarget||a.srcElement,l;if(a.type==="load"||c&&ma.test(c.readyState))B=null,a=c.getAttribute("data-requirecontext"),l=c.getAttribute("data-requiremodule"),C[a].completeLoad(l),c.detachEvent&&!da?c.detachEvent("onreadystatechange",d.onScriptLoad):c.removeEventListener("load",d.onScriptLoad,!1)};d.attach=function(a,c,l,j,k,o){var p;if(H)return j=j||d.onScriptLoad,p=c&&c.config&&c.config.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml",
"html:script"):document.createElement("script"),p.type=k||c&&c.config.scriptType||"text/javascript",p.charset="utf-8",p.async=!x.skipAsync[a],c&&p.setAttribute("data-requirecontext",c.contextName),p.setAttribute("data-requiremodule",l),p.attachEvent&&!da?(P=!0,o?p.onreadystatechange=function(){if(p.readyState==="loaded")p.onreadystatechange=null,p.attachEvent("onreadystatechange",j),o(p)}:p.attachEvent("onreadystatechange",j)):p.addEventListener("load",j,!1),p.src=a,o||d.addScriptToDom(p),p;else ca&&
(importScripts(a),c.completeLoad(l));return null};if(H){o=document.getElementsByTagName("script");for(A=o.length-1;A>-1&&(v=o[A]);A--){if(!u)u=v.parentNode;if(E=v.getAttribute("data-main")){if(!t.baseUrl)o=E.split("/"),v=o.pop(),o=o.length?o.join("/")+"/":"./",t.baseUrl=o,E=v.replace(aa,"");t.deps=t.deps?t.deps.concat(E):[E];break}}}d.checkReadyState=function(){var a=x.contexts,c;for(c in a)if(!(c in K)&&a[c].waitCount)return;d.resourcesReady(!0)};d.resourcesReady=function(a){var c,l;d.resourcesDone=
a;if(d.resourcesDone)for(l in a=x.contexts,a)if(!(l in K)&&(c=a[l],c.jQueryIncremented))U(c.jQuery,!1),c.jQueryIncremented=!1};d.pageLoaded=function(){if(document.readyState!=="complete")document.readyState="complete"};if(H&&document.addEventListener&&!document.readyState)document.readyState="loading",window.addEventListener("load",d.pageLoaded,!1);d(t);if(d.isAsync&&typeof setTimeout!=="undefined")y=x.contexts[t.context||"_"],y.requireWait=!0,setTimeout(function(){y.requireWait=!1;y.scriptCount||
y.resume();d.checkReadyState()},0)}})();


function randomUUID() {
  var s = [], itoh = '0123456789ABCDEF';
  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
  s[14] = 4;
  s[19] = (s[19] & 0x3) | 0x8;
  for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}

//------------------------------------------------

define('jquery',
       ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'],
       function(){
         return window.jQuery;
       }
);

require(['jquery'], 
  function($){ 
    var slideSteps = [];  

    $.getScript(ijshost + '/javascripts/jquery.blockUI.js', function(data, textStatus){
      $.getScript(ijshost + '/javascripts/jquery.qrcode.min.js', function(data, textStatus){
        $.getScript(ijshost + '/socket.io/socket.io.js', function(data, textStatus){
          processImpressjs();
          connectToServer(slideSteps);
        });
      });
    });

    function getCurrStepId(){
      return window.location.hash.replace(/^#\/?/,"");
    }

    function processImpressjs(){
      var steps = $('#impress .step');
      for(var s = 0; s < steps.length; s++){
        slideSteps.push({
          id: $(steps[s]).attr("id"),
          text: $(steps[s]).text()
        });
      }
    }

    function connectToServer(){
      var socket = io.connect(ijshost);

      var slideId = randomUUID();

      window.addEventListener("hashchange", function(){
        socket.emit('current_step', {currStepId: getCurrStepId()});
      }, false);

      socket.on('connect', function(){
        socket.emit('add_slide', {
          slideId: slideId,
          steps: slideSteps
        });
      });

      socket.on('slide_add_success', function(data){
        $(document.body).append('<div id="qrDialog"><div id="qrcode_canvas"></div><div id="qrUrl"></div></div>')
        $('#qrcode_canvas').qrcode(ijshost + '/mobile/' + data.slideId);
        $('#qrUrl').text(ijshost + '/mobile/' + data.slideId);
        $.blockUI({
          message: $('#qrDialog'),
          onUnblock: function(){
            $('#qrDialog').remove();
          }
        });
      });

      socket.on('accept_mobile_control', function(){
        $.unblockUI();
        socket.emit('current_step', {currStepId: getCurrStepId()});
      });

      socket.on('next', function(){
        var currStepId = getCurrStepId();
        for(var i = 0; i < slideSteps.length; i++){
          if(slideSteps[i].id == currStepId){
            var nextStepId = currStepId;
            if(i + 1 == slideSteps.length){
              nextStepId = slideSteps[0].id;
            }else{
              nextStepId = slideSteps[i + 1].id;
            }
            window.location.hash = "#/" + nextStepId;
            break;
          }
        }
      });

      socket.on('prev', function(){
        var currStepId = getCurrStepId();
        for(var i = 0; i < slideSteps.length; i++){
          if(slideSteps[i].id == currStepId){
            var prevStepId = currStepId;
            if(i == 0){
              prevStepId = slideSteps[slideSteps.length - 1].id;
            }else{
              prevStepId = slideSteps[i - 1].id;
            }
            window.location.hash = "#/" + prevStepId;
            break;
          }
        }
      });

      socket.on('step', function(data){
        window.location.hash = "#/" + data.stepId;
      });

    }
  }
);

