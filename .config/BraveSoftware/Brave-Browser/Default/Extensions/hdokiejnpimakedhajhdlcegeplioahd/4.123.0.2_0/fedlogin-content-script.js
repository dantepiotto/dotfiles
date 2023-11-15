with((function() { var getProxy = function(globalContext, proxifyGlobalContext) {

  var globals = {};

  var hasOwnProperty = function(object, property) {
    if (object) {
      return Object.prototype.hasOwnProperty.call(object, property) || object.hasOwnProperty(property);
    }
    return false;
  };

  var isGlobalProperty = function(property) {
    if (hasOwnProperty(globals, property)) {
      return true;
    }
    var value = globalContext[property];
    if (hasOwnProperty(globalContext, property)) {
        return !(value instanceof Element || value instanceof HTMLCollection) || Object.getOwnPropertyNames(globalContext).includes(property);
    } else {
      return (typeof(EventTarget) !== 'undefined' && hasOwnProperty(EventTarget.prototype, property)) ||
             (typeof(ContentScriptGlobalScope) !== 'undefined' && hasOwnProperty(ContentScriptGlobalScope.prototype, property));
    }
  };

  var proxiedFunctions = Object.create(null);

  var proxy = typeof Proxy !== 'function' ? globalContext : new Proxy(Object.create(null), {
    get: function (target, property, receiver) {
        var isProxiedFunction = Object.prototype.hasOwnProperty.call(proxiedFunctions, property);

        if (property === Symbol.unscopables || !(isGlobalProperty(property) || isProxiedFunction)) {
            return void 0;
        }

        var isUserGlobal = hasOwnProperty(globals, property);

        var value = isProxiedFunction ? proxiedFunctions[property] : (isUserGlobal ? globals[property] : globalContext[property]);

        if (proxifyGlobalContext && value === globalContext) {
          value = proxy;
        }

        if (!isProxiedFunction && !isUserGlobal && typeof(value) === 'function' && /^[a-z]/.test(property)) {
            value = proxiedFunctions[property] = new Proxy(value, {
                construct: function (target, argumentsList, newTarget) {
                    return Reflect.construct(target, argumentsList, newTarget);
                },
                apply: function (target, thisArg, argumentsList) {
                    return Reflect.apply(target, thisArg === proxy ? globalContext : thisArg, argumentsList);
                }
            });
        }

        return value;
    },
    set: function (target, property, value) {
      if (proxifyGlobalContext) {
        globals[property] = value;
      } else {
        globalContext[property] = value;
      }
      return delete proxiedFunctions[property];
    },
    has: function () {
      return true;
    }
  });

  return proxy;

}; return getProxy(this, false); })()) {with(function(){var i,c=this,n=!1,t={},p=function(i,o){return!!i&&(Object.prototype.hasOwnProperty.call(i,o)||i.hasOwnProperty(o))},_=function(i){var o;return!!p(t,i)||(o=c[i],p(c,i)?!(o instanceof Element||o instanceof HTMLCollection)||Object.getOwnPropertyNames(c).includes(i):"undefined"!=typeof EventTarget&&p(EventTarget.prototype,i)||"undefined"!=typeof ContentScriptGlobalScope&&p(ContentScriptGlobalScope.prototype,i))},r=Object.create(null),I="function"!=typeof Proxy?c:new Proxy(Object.create(null),{get:function(i,o,T){var E=Object.prototype.hasOwnProperty.call(r,o),s,e;if(o!==Symbol.unscopables&&(_(o)||E))return s=p(t,o),e=(E?r:s?t:c)[o],n&&e===c&&(e=I),E||s||"function"!=typeof e||!/^[a-z]/.test(o)?e:r[o]=new Proxy(e,{construct:function(i,o,T){return Reflect.construct(i,o,T)},apply:function(i,o,T){return Reflect.apply(i,o===I?c:o,T)}})},set:function(i,o,T){return n?t[o]=T:c[o]=T,delete r[o]},has:function(){return!0}});return I}()){function addWebsiteAbilities(i){var o=document.documentElement.getAttribute("lastpass-extension"),o;o=(o=o?o.split(" "):[]).concat(i),document.documentElement.setAttribute("lastpass-extension",o.join(" "))}Topics=function(){var e={};return{publish:function(i,o){Topics.get(i).publish(o)},get:function(i){var o=i&&e[i],s,T,E,o;return o||(s=[],T=function(i){for(var o=0,T=s.length;o<T;++o)if(i===s[o])return o;return-1},E=function(i){var i=T(i);-1<i&&s.splice(i,1)},o={publish:function(){for(var i=!0,o=s.slice(),T=0,E=o.length;T<E&&!1!==i;++T)try{"function"==typeof o[T]&&(i=o[T].apply(window,arguments))}catch(i){"function"==typeof LPPlatform.logException&&LPPlatform.logException(i)}},subscribe:function(i){-1===T(i)&&s.push(i)},subscribeFirst:function(i){E(i),s.unshift(i)},unsubscribe:function(i){E(i)}},i&&(e[i]=o)),o}}}(),Topics.ITEMS_DESELECTED=1,Topics.ITEMS_SELECTED=2,Topics.CONTEXT_MENU=3,Topics.CONFIRM=4,Topics.ITEM_SHARE=5,Topics.ERROR=6,Topics.SUCCESS=7,Topics.IDENTITY_ENABLE=8,Topics.SITE_ADDED=9,Topics.NOTE_ADDED=10,Topics.FORM_FILL_ADDED=11,Topics.EDIT_NOTE=12,Topics.EDIT_SITE=13,Topics.EDIT_FORM_FILL=14,Topics.ACCEPT_SHARE=15,Topics.REJECT_SHARE=16,Topics.GROUP_ADDED=17,Topics.RENAME_FOLDER=18,Topics.CONTEXT_CLOSE=19,Topics.EDIT_SETTINGS=20,Topics.REQUEST_START=21,Topics.REQUEST_SUCCESS=22,Topics.REQUEST_ERROR=23,Topics.COLLAPSE_ALL=24,Topics.EXPAND_ALL=25,Topics.DISPLAY_GRID=26,Topics.DISPLAY_LIST=27,Topics.CLEAR_DATA=28,Topics.EDIT_IDENTITY=29,Topics.CREATE_SUB_FOLDER=30,Topics.DIALOG_OPEN=31,Topics.DIALOG_CLOSE=32,Topics.ESCAPE=33,Topics.IDENTITY_ADDED=34,Topics.PUSH_STATE=35,Topics.EDIT_SHARED_FOLDER=36,Topics.LEFT_ARROW=37,Topics.RIGHT_ARROW=38,Topics.PASSWORD_CHANGE=39,Topics.UP_ARROW=40,Topics.DOWN_ARROW=41,Topics.ENTER=42,Topics.EDIT_SHARED_FOLDER_ACCESS=43,Topics.REMOVED_SHARED_FOLDER_USER=44,Topics.LOGIN=45,Topics.REFRESH_DATA=46,Topics.ACCOUNT_LINKED=48,Topics.ACCOUNT_UNLINKED=49,Topics.CREATE_SHARED_FOLDER=50,Topics.DIALOG_LOADING=51,Topics.DIALOG_LOADED=52,Topics.REPROMPT=53,Topics.EDIT_APPLICATION=54,Topics.ATTACHMENT_REMOVED=55,Topics.CLEAR_STATE=56,Topics.SELECT_COUNT_CHANGE=57,Topics.REAPPLY_SEARCH=58,Topics.EMERGENCY_RECIPIENT_ADDED=59,Topics.EDIT_EMERGENCY_RECIPIENT=60,Topics.UPDATE_NOTIFICATION_COUNT=61,Topics.UPDATE_VAULT_STATE=62,Topics.ENROLLED_CREDIT_MONITORING=63,Topics.ITEM_SHARED=64,Topics.REFRESH_PREFERENCES=65,Topics.DISPLAY_COMPACT=66,Topics.DISPLAY_LARGE=67,Topics.ALL_COLLAPSED=68,Topics.ALL_EXPANDED=69,Topics.APPLICATION_ADDED=70,Topics.REQUEST_STATUS=71,Topics.DIALOG_RESIZE=72,Topics.SECURENOTE_TEMPLATE_ADDED=73,Topics.INITIALIZED=74,Topics.REQUEST_FRAMEWORK_INITIALIZED=75,Topics.SITE_NOTIFICATION_STATE=76,Topics.SITE_NOTIFICATION=77,Topics.DROPDOWN_SHOWN=78,Topics.DROPDOWN_HIDE=79,Topics.FILLED_GENERATED_PW=80,Topics.VAULT_LEFT_MENU_TOGGLE=81,Topics.EMPTY_VAULT_STATE_CHANGE=82,Topics.LOGIN_FINISHED=83,Topics.ACCTS_VERSION_UPDATED=84,Topics.ITEM_REMOVED=85,Topics.INFIELD_NOTIFICATION_OPENED=86,Topics.INFIELD_NOTIFICATION_CLOSED=87,Topics.INFIELD_NOTIFICATION_FILLED=88,Topics.INFIELD_FRAME_POSITION_CHANGED=89,Topics.MIGRATION_RUNNING=90,Topics.BLOB_UPDATED=91,Topics.CONVERT_FOLDER_TO_LEGACY=92,Topics.FORM_SUBMITTED=93,Topics.INTRO_TOURS_LOADED=94,Topics.PREFERENCES_READ=95,Topics.PREFERENCES_WRITE=96,Topics.MANUAL_LOGIN_FINISHED=97,Topics.PROCESSED_FORM_SUBMIT=98,Topics.BADGE_NOTIFICATION=99,Topics.BADGE_CLEAR=100,Topics.POPOVER_RESIZE=101,Topics.MATCHING_ITEMS_CHANGED=102,Topics.PASSWORD_FORM_SUBMITTED=103,Topics.REMOVED_SHARE=104,Topics.ACCOUNT_LINKED_NEEDS_VERIFICATION=105,Topics.CONTENT_SCRIPT_ADD_SITE_DIALOG_OPENED=106,Topics.SPA_IFRAME_WEB_CLIENT_INITIALIZED=107,LPPlatform="undefined"==typeof LPPlatform?{}:LPPlatform,!function(s){var o;s.requestFrameworkInitializer=(o=function(i,o){var T=i("",{name:"requestPort"});return T.onMessage.addListener(o),function(i){T.postMessage(i)}},function(i){return o(chrome.runtime&&chrome.runtime.connect||parent.chrome.runtime.connect,i)}),s.installBinary=function(o,T){var E=getBG();chrome.permissions.contains({permissions:["nativeMessaging"]},function(i){o||i?E.openURL(E.base_url+"installer/"):s.requestNativeMessaging(T)})},s.requestNativeMessaging=function(i){var o=getBG();o.Preferences.set("native_messaging_asked","1"),i?window.open("/native_messaging.html?hidenever=1"):void 0!==chrome.permissions&&chrome.permissions.request({permissions:["nativeMessaging","privacy"]},function(i){i&&alert(o.gs("Please restart your browser to finish enabling native messaging."))})}}(LPPlatform),addWebsiteAbilities("fedlogin"),!function(){var E=null,i,s=LPPlatform.requestFrameworkInitializer(function(i){i.fromExtension=!0,E&&E.target.postMessage(i,E.origin)}),o;window.addEventListener("message",function(i){var o=i.data,T=o&&o.data;!o.type||!(E=null===E&&(i.origin===window.origin||"undefined"!=typeof bg&&bg.get("base_url")===i.origin+"/")?{target:i.source,origin:i.origin}:E)||E.target!==i.source||E.origin!==i.origin||o.fromExtension||T&&T.cmd&&"FederatedLogin"!==T.cmd[0]&&"getVersion"!==T.cmd||s(o)},!0)}()}}