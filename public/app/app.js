(() => {
    'use strict';

    let app = angular.module('todoApp', [])

    .controller('UserController', ($scope, $http) => {
        $scope.user = {
            name: $scope.username,
            password: $scope.password
        };
    });

})();
