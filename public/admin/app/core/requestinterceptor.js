(function() {
    'use strict';

    angular.module('app')
        .factory('myInterceptor', myInterceptor);

    myInterceptor.$inject = ['$q','$rootScope','$injector','CONST'];

    /* @ngInject */
    function myInterceptor($q, $rootScope, $injector, CONST) {
        var interceptor = {
            request: request
        }

        return interceptor;

        ////////////////

        function request(config){
            var d = $q.defer();
            var $state = $injector.get('$state');
            console.log(config);
            if($rootScope.authenticated || config.method == "GET" || config.url == CONST.api_domain+'authenticate'){
                d.resolve(config);
            }else{
                d.reject(config);
                $state.go('auth');
            }
            
            return d.promise;
            
        }
    }

})();