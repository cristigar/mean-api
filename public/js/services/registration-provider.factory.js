(function() {
    "use strict";

    angular.module('todoApp').factory('RegistrationProvider', RegistrationProvider);

    RegistrationProvider.$inject = ['$http'];

    function RegistrationProvider($http) {
        var registration = {};

        registration.register = function(user) {
            return new Promise(function(resolve, reject) {
                $http.post('/api/v1/users', {
                    name: user.name,
                    password: user.password
                }).then(handleSuccess, handleError);

                function handleSuccess(response) {
                    if (response.data.success) {
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

        registration.isValid = function(user) {
            var isValid = true;
            if (user.password !== user.checkPassword) {
                isValid = false;
            }

            return isValid;
        };

        return registration;
    }
})();
