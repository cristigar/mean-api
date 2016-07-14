(function() {
    "use strict";

    angular.module('todoApp').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$rootScope', '$http', 'AuthProvider'];

    function DashboardController($location, $rootScope, $http, AuthProvider) {
        let vm = this;

        $rootScope.logout = function() {
            console.log("Logging out...");
            AuthProvider.logout();
            $location.path('#/login');
        };

        vm.addTodo = function() {
            // console.log(vm.todo.name);
            // console.log('User id from localstorage ' + window.localStorage.user.id);
            // let user = JSON.parse(window.localStorage.user);
            console.log(window.localStorage.user);
            $http.post('/api/v1/todos', {
                name: vm.todo.name,
                author: 'xxxxxxxxxxxxxxxxxxxx',
                token: window.localStorage.token
            }).then(handleSuccess, handleError);

            function handleSuccess(response) {
                // if (response.data.success) {
                //     window.localStorage.user = response.data.user;
                //     window.localStorage.token = response.data.token;
                //     $rootScope.user = response.data.user;
                //     resolve();
                // } else {
                //     console.log('se face');
                //     reject(response.data.message);
                // }
            }

            function handleError(response) {
                // reject(response.data.message);
            }
        };
    }
})();
