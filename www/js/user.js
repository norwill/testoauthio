angular.module('resources.user', ['LocalStorageModule']).
        factory('User', [function() {

            var user = {
              id: null,
              firstName: null,
              lastName: null,
              name: null,
              email: null,
              locale: 'en_US',
              dbName: null
            };
            function destroyUser() {
              user = {
                id: null,
                firstName: null,
                lastName: null,
                name: null,
                email: null,
                locale: 'en_US',
                dbName: null
              };
              api.currentUser = null;
            }
            function setUser(currentUser) {
              user.id = currentUser.id || null;
              user.firstName = currentUser.first_name || currentUser.firstName || null;
              user.lastName = currentUser.last_name || currentUser.lastName || null;
              user.name = currentUser.name || null;
              user.email = currentUser.email || null;
              user.locale = currentUser.locale || 'en_US';
              user.dbName = user.firstName.toLowerCase() + user.id;
              api.currentUser = user;
              return user;
            }
            var api = {
              setCurrentUser: setUser,
              destroyUser: destroyUser,
              currentUser: null
            };
            return api;
          }]);