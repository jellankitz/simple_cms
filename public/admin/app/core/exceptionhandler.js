(function() {
    'use strict';

    angular.module('app')
        .config(ExceptionHandler);

    ExceptionHandler.$inject = ['$provide'];

    /* @ngInject */
    function ExceptionHandler($provide) {

        $provide.decorator("$exceptionHandler", myExceptionHandler);

        return myExceptionHandler;

        /////////////
        myExceptionHandler.$inject = ['$log'];

        function myExceptionHandler($log) {
            return function(exception, cause) {
                $log.warn(exception);
                //var $rootScope = $injector.get("$rootScope");
                //$rootScope.addExceptionAlert({ message: "Exception", reason: exception }); // This represents a custom method that exists within $rootScope
                //$delegate(exception, cause);
            };
        }
    }

})();