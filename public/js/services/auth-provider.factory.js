(function() {
    'use strict';

    angular.module('todoApp').factory('AuthProvider', AuthProvider);

    AuthProvider.$inject = ['$http', '$rootScope'];

    function AuthProvider($http, $rootScope) {
        var auth = {};

        auth.init = function() {
            if (auth.isLoggedIn()) {
                $rootScope.user = auth.getCurrentUser();
            }
        };

        auth.login = function(name, password) {

            return new Promise(function(resolve, reject) {
                $http.post('/api/v1/users/login', {
                    name: name,
                    password: password
                }).then(handleSuccess, handleError);

                function handleSuccess(response) {
                    if (response.data.success) {
                        window.localStorage.user = JSON.stringify(response.data.user);
                        window.localStorage.token = response.data.token;
                        $rootScope.user = response.data.user;
                        resolve();
                    } else {
                        reject(response.data.message);
                    }
                }

                function handleError(response) {
                    reject(response.data.message);
                }
            });
        };

        auth.logout = function() {
            delete window.localStorage.user;
            delete $rootScope.user;
        };

        auth.getCurrentUser = function() {
            return window.localStorage.user;
        };

        auth.isLoggedIn = function() {
            return window.localStorage.user !== undefined;
        };

        return auth;
    }
})();
