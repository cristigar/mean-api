(function() {
    describe(
        'todoApp', ['$location', '$rootScope', '$http', 'AuthProvider', '$scope'],
        function() {

            beforeEach(module('todoApp'));

            var $controller;

            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_;
            }));

            describe(
                'greeting',
                function() {
                    it(
                        'should say "Hello"',
                        function() {
                            var controller = $controller('DashboardController', {
                                $scope: vm
                            });
                            expect(true).toBe(true);
                        });
                });
        });
})();
