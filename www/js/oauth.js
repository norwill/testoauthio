angular.module('resources.OAuth', []).//'ionic'
        factory('OAuth', ['$q', '$document', '$rootScope', function($q, $document, $rootScope) {

            var _pubKey = 'USE_YOUR_PUB_KEY_HERE';
            function isMobile() {
              return false;
              //return !!(ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone());
            }
            var initializeScript = function() {
              if (window.OAuth) {
                return $q.when(window.OAuth);
              }
              var script = 'js/oauth.min.js';
              if (isMobile()) {
                script = 'js/oauth.js';
              }
              var d = $q.defer();
              function onScriptLoad() {
                $rootScope.$apply(function() {
                  window.OAuth.initialize(_pubKey);
                  d.resolve(window.OAuth);
                });
              }
              var scriptTag = $document[0].createElement('script');
              scriptTag.type = 'text/javascript';
              scriptTag.async = true;
              scriptTag.src = script;
              scriptTag.onreadystatechange = function() {
                if (this.readyState == 'complete')
                  onScriptLoad();
              }
              scriptTag.onload = onScriptLoad;

              var s = $document[0].getElementsByTagName('body')[0];
              s.appendChild(scriptTag);
              return d.promise;
            };

            return {
              service: function() {
                if (window.OAuth) {
                  return $q.when(window.OAuth);
                } else {
                  return initializeScript();
                }
              }
            };
          }]);