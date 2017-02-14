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
            
            if(config.method != "GET"){
                if($rootScope.authenticated){
                    d.resolve(config);
                }
                else if(config.url == CONST.api_domain+'authenticate'){
                    d.resolve(config);
                }
                else{
                    d.reject(config);
                    $state.go('auth');
                }
            }else{
                d.resolve(config);
            }
            
            return d.promise;
            
        }
    }

})();