(function() {
    'use strict';

    angular.module('todoApp').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$rootScope', '$http', 'AuthProvider'];

    function DashboardController($location, $rootScope, $http, AuthProvider) {
        let vm = this;
        vm.todos = [];

        const user = JSON.parse(window.localStorage.user);

        vm.logout = function() {
            AuthProvider.logout();
            $location.path('/login');
        };

        vm.getTodos = function() {
            $http.get('/api/v1/todos/' + user._id, {
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.todos = response.data;
            }

            function handleError(response) {}
        };

        vm.addTodo = function() {
            $http.post('/api/v1/todos', {
                name: vm.todo.name,
                author: user._id,
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.todo.name = '';
                vm.getTodos();
            }

            function handleError(response) {}
        };

        vm.markAsDone = function(todo) {
            $http.put('/api/v1/todos/' + todo._id, {
                name: todo.name,
                done: todo.done,
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.getTodos();
            }

            function handleError(response) {}
        };

        vm.deleteTodo = function(todo) {
            $http.delete('/api/v1/todos/' + todo._id)
                .then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.getTodos();
            }

            function handleError(response) {}
        };

        vm.editTodo = function(todo) {
            $http.put('/api/v1/todos/' + todo._id, {
                name: todo.name,
                done: todo.done,
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.getTodos();
            }

            function handleError(response) {}
        };

        vm.getTodos();
    }
})();
