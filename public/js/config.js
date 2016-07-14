(function() {
    'use strict';
    angular.module('todoApp').config(['$routeProvider', configure]);

    function configure($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './views/home.view.html',
            controller: 'MainController',
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
    // function configure($routeProvider) {
    //     $routeProvider
    //     .when('/', {
    //         templateUrl: './views/home.view.html',
    //         controller: 'MainController',
    //         controllerAs: 'vm'
    //     });
    //     // .when('/register', {
    //     //     templateUrl: './app/views/register.view.html',
    //     //     controller: 'RegisterController',
    //     //     controllerAs: 'vm'
    //     // })
    //     // .when('/login', {
    //     //     templateUrl: 'views/login.view.html',
    //     //     controller: 'LoginController',
    //     //     controllerAs: 'vm'
    //     // })
    //     // .when('/dashboard', {
    //     //     templateUrl: 'views/dashboard.view.html',
    //     //     controller: 'DashboardController',
    //     //     controllerAs: 'vm'
    //     // });
    // }
})();
