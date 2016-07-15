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
                vm.error = "Invalid password";
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
        };
    }
})();
