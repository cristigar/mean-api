(function() {
    'use strict';

    angular.module('todoApp').directive('contenteditable', ContentEditable);

    ContentEditable.$inject = ['AuthProvider'];

    function ContentEditable() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {

                function read() {
                    ngModel.$setViewValue(element.text());
                }

                ngModel.$render = function() {
                    element.text(ngModel.$viewValue || "");
                };

                element.bind("blur keyup keydown keypress change", function(event) {
                    console.log(event);
                    if (event.which === 13 || event.type === 'blur') {
                        event.preventDefault();
                        scope.$apply(read);
                        element[0].blur();
                    } else if (event.which === 27) {
                        element[0].blur();
                    }
                });
            }
        };
    }
})();
