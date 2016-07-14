(function() {
    "use strict";

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
                    console.log(response);
                    if (response.data.success) {
                        window.localStorage.user = JSON.stringify(response.data.user);
                        window.localStorage.token = response.data.token;
                        $rootScope.user = response.data.user;
                        resolve();
                    } else {
                        console.log('se face');
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

        // auth.checkPermissionsForView = function(view) {
        //     if (!view.requiresAuthentication) {
        //         return true;
        //     }
        //
        //     return userHasPermissionForView(view);
        // };
        //
        // function userHasPermissionForView(view) {
        //     if (!auth.isLoggedIn()) {
        //         return false;
        //     }
        //
        //     if (!view.permissions || !view.permisions.length) {
        //         return true;
        //     }
        //
        //     return auth.userHasPermission(view.permissions);
        // }
        //
        // auth.userHasPermission = function(permissions) {
        //     if (!auth.isLoggedIn()) {
        //         return false;
        //     }
        //     var found = false;
        //
        //     angular.forEach(permissions, function(permision, index) {
        //         if (window.localStorage.user.user_permissions.indexOf(permission) >= 0) {
        //             found = true;
        //             return;
        //         }
        //     });
        //
        //     return found;
        // };

        auth.getCurrentUser = function() {
            return window.localStorage.user;
        };

        auth.isLoggedIn = function() {
            return window.localStorage.user !== undefined;
        };

        return auth;
    }
})();
