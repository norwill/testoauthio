(function(){"use strict";var a=angular.module("LocalStorageModule",[]);a.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){this.prefix=a},this.setStorageType=function(a){this.storageType=a},this.setStorageCookie=function(a,b){this.cookie={expiry:a,path:b}},this.setStorageCookieDomain=function(a){this.cookie.domain=a},this.setNotify=function(a,b){this.notify={setItem:a,removeItem:b}},this.$get=["$rootScope","$window","$document",function(a,b,c){var d=this.prefix,e=this.cookie,f=this.notify,g=this.storageType,h=b[g];c||(c=document),"."!==d.substr(-1)&&(d=d?d+".":"");var i=function(){try{var c=g in b&&null!==b[g],e=d+"__"+Math.round(1e7*Math.random());return c&&(h.setItem(e,""),h.removeItem(e)),c}catch(f){return g="cookie",a.$broadcast("LocalStorageModule.notification.error",f.message),!1}}(),j=function(b,c){if(!i)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),f.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),p(b,c);"undefined"==typeof c&&(c=null);try{(angular.isObject(c)||angular.isArray(c))&&(c=angular.toJson(c)),h.setItem(d+b,c),f.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:this.storageType})}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.message),p(b,c)}return!0},k=function(b){if(!i)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),q(b);var c=h.getItem(d+b);return c&&"null"!==c?"{"===c.charAt(0)||"["===c.charAt(0)?angular.fromJson(c):c:null},l=function(b){if(!i)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),f.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),r(b);try{h.removeItem(d+b),f.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:this.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),r(b)}return!0},m=function(){if(!i)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=d.length,c=[];for(var e in h)if(e.substr(0,b)===d)try{c.push(e.substr(b))}catch(f){return a.$broadcast("LocalStorageModule.notification.error",f.Description),[]}return c},n=function(b){b=b||"";var c=d.slice(0,-1),e=new RegExp(c+"."+b);if(!i)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),s();var f=d.length;for(var g in h)if(e.test(g))try{l(g.substr(f))}catch(j){return a.$broadcast("LocalStorageModule.notification.error",j.message),s()}return!0},o=function(){try{return navigator.cookieEnabled||"cookie"in c&&(c.cookie.length>0||(c.cookie="test").indexOf.call(c.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},p=function(b,f){if("undefined"==typeof f)return!1;if(!o())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var g="",h=new Date,i="";if(null===f?(h.setTime(h.getTime()+-864e5),g="; expires="+h.toGMTString(),f=""):0!==e.expiry&&(h.setTime(h.getTime()+24*e.expiry*60*60*1e3),g="; expires="+h.toGMTString()),b){var j="; path="+e.path;e.domain&&(i="; domain="+e.domain),c.cookie=d+b+"="+encodeURIComponent(f)+g+j+i}}catch(k){return a.$broadcast("LocalStorageModule.notification.error",k.message),!1}return!0},q=function(b){if(!o())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var e=c.cookie&&c.cookie.split(";")||[],f=0;f<e.length;f++){for(var g=e[f];" "===g.charAt(0);)g=g.substring(1,g.length);if(0===g.indexOf(d+b+"="))return decodeURIComponent(g.substring(d.length+b.length+1,g.length))}return null},r=function(a){p(a,null)},s=function(){for(var a=null,b=d.length,e=c.cookie.split(";"),f=0;f<e.length;f++){for(a=e[f];" "===a.charAt(0);)a=a.substring(1,a.length);var g=a.substring(b,a.indexOf("="));r(g)}},t=function(){return g},u=function(a,b,c){var d=k(b);null===d&&angular.isDefined(c)?d=c:angular.isObject(d)&&angular.isObject(c)&&(d=angular.extend(c,d)),a[b]=d,a.$watchCollection(b,function(a){j(b,a)})};return{isSupported:i,getStorageType:t,set:j,add:j,get:k,keys:m,remove:l,clearAll:n,bind:u,cookie:{set:p,add:p,get:q,remove:r,clearAll:s}}}]})}).call(this);