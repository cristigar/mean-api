(function() {
    'use strict';

    angular.module('todoApp').controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'AuthProvider'];

    function LoginController($location, $scope, AuthProvider) {
        let vm = this;
        vm.user = {};
        vm.hasError = false;

        vm.authenticate = function() {
            AuthProvider.login(vm.user.name, vm.user.password)
                .then(function() {
                    $scope.$apply(function() {
                        $location.path('/');
                    });
                }).catch(function(err) {
                    $scope.$apply(function() {
                        vm.hasError = true;
                        vm.error = err;
                    });
                });
        };

        vm.url = function(url) {
            $location.path(url);
        };
    }
})();
