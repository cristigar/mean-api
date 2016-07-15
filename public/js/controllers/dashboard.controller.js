(function() {
    "use strict";

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
                console.log('Getting all todos WORKING');
                console.log(response);
                vm.todos = response.data;
            }

            function handleError(response) {
                console.log('Getting all todos NOT WORKING: ' + response);
            }
        };

        vm.addTodo = function() {
            // console.log(vm.todo.name);
            // console.log('User id from localstorage ' + window.localStorage.user.id);

            $http.post('/api/v1/todos', {
                name: vm.todo.name,
                author: user._id,
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                console.log('Posting a todo WORKING [' + vm.todo.name + ']');
                vm.todo.name = '';
                vm.getTodos();
            }

            function handleError(response) {
                console.log('Posting a todo NOT WORKING');
            }
        };

        vm.markAsDone = function(todo) {
            console.log('Mark as done', todo);
            $http.put('/api/v1/todos/' + todo._id, {
                name: todo.name,
                done: todo.done,
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.getTodos();
            }

            function handleError(response) {
                console.log('Marking as done NOT WORKING');
            }
        };

        vm.deleteTodo = function(todo) {
            $http.delete('/api/v1/todos/' + todo._id)
                .then(handleSuccess, handleError);

            function handleSuccess(response) {
                vm.getTodos();
            }

            function handleError(response) {
                console.log('Deleting todo NOT WORKING');
            }
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

            function handleError(response) {
                console.log('Edit todo NOT WORKING');
            }
        };

        vm.getTodos();
    }
})();
