(function() {
    'use strict';

    angular.module('todoApp').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'RegistrationProvider'];

    function RegisterController($location, $scope, RegistrationProvider) {
        let vm = this;
        vm.user = {};

        vm.register = function() {
            if (RegistrationProvider.isValid(vm.user)) {
                RegistrationProvider.register(vm.user)
                    .then(handleSuccess)
                    .catch(handleError);
            } else {
                vm.hasError = true;
                vm.error = "Passwords do not match";
            }

            function handleSuccess() {
                $scope.$apply(function() {
                    $location.path('/login');
                });
            }

            function handleError(err) {
                $scope.$apply(function() {
                    vm.hasError = true;
                    vm.error = err;
                });
            }


            // console.log(vm.user);
            // $http.post('/api/v1/users/', vm.user);
            // $http.post('/api/v1/users/login', vm.user)
            //     .success(function(data) {
            //         vm.user = {};
            //         $location.path('/dashboard');
            //         console.log(data);
            //     })
            //     .error(function(data) {
            //         console.log('Error: ' + data);
            //     });
        };
    }
})();
