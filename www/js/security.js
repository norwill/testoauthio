angular.module('security.service', ['resources.OAuth', 'resources.user'])
        .factory('Security', ['$q', 'OAuth', 'User', 'localStorageService', function($q, OAuth, User, localStorageService) {
            var restoreSession = function() {
              var currentUser = localStorageService.get('user');
              if (currentUser) {
                var user = User.setCurrentUser(currentUser);
                return user;
              } else {
                return null;
              }
            };
            var createSession = function() {
              localStorageService.set('user', User.currentUser);
            };
            var destroySession = function() {
              OAuth.service().then(function(_oauth) {
                _oauth.clearCache('facebook');
              });
              localStorageService.clearAll();
              User.destroyUser();
            };

            var startFBLogin = function() {
              var deferred = $q.defer();
              OAuth.service().then(function(_oauth) {
                _oauth.popup('facebook',
                        {
                          cache: false
                        },
                function(error, result) {
                  if (error) {
                    deferred.reject(error);
                  }
                  console.log(result);
                  result.get("/me").done(function(res) {
                    deferred.resolve(res);
                  });
                });
              });
              return deferred.promise;
            }

            var fbLogin = function(successCb, errorCb) {
              var loginUser = startFBLogin();
              return loginUser.then(function(result) {
                User.setCurrentUser(result);
                createSession();
                successCb(result);
              }, errorCb);
            };

            var service = {
              fbLogin: fbLogin,
              createSession: createSession,
              destroySession: destroySession,
              restoreSession: restoreSession,
              requestCurrentUser: function() {
                if (service.isAuthenticated()) {
                  return $q.when(User.currentUser);
                } else {
                  return $q.when(restoreSession());
                }
              },
              isAuthenticated: function() {
                return !!User.currentUser;
              }
            };

            return service;
          }]);