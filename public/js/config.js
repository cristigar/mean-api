(function() {
    'use strict';

    angular.module('todoApp')
        .config(['$routeProvider', configure])
        .run(['$rootScope', '$location', 'AuthProvider', run]);

    function configure($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/dashboard.view.html',
                requiresAuthentication: true,
                controller: 'DashboardController',
                controllerAs: 'vm'
            }).when('/register', {
                templateUrl: './views/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            }).when('/login', {
                templateUrl: './views/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
    }

    function run($rootScope, $location, AuthProvider) {
        AuthProvider.init();

        $rootScope.$on('$routeChangeStart', function(event, next) {
            // console.log(window.localStorage);
            if (next !== undefined) {
                var originalPath = next.$$route.originalPath;

                if (originalPath === '/login' && AuthProvider.isLoggedIn()) {
                    $location.path('/');
                }

                if (!AuthProvider.checkPermissionsForView(next)) {
                    event.preventDefault();
                    $location.path('/login');
                }
            }
        });

        $rootScope.url = function(url) {
            $location.path(url);
        };
    }
})();
