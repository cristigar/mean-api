(function() {
    "use strict";

    angular.module('todoApp').controller('MainController', MainController);

    MainController.$inject = ['$location', '$rootscope', 'AuthProvider'];

    function MainController($location, $rootscope, AuthProvider) {
        // $rootScope.logout = function() {
        //     AuthProvider.logout();
        //     $location.path('login');
        // };
    }
})();
