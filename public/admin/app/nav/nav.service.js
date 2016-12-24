(function(){
    'use strict';
    
    angular.module('app')
            .factory('NavService', NavService);
    
    NavService.$inject = ['$http', 'CONST', '$q'];
    
    /* @ngInject */
    function NavService($http, CONST, $q){
        var api = CONST.api_domain + 'nav/';
        var d = $q.defer();
        
        var service = {
            navs: {},
            errors: {},
            getNavs: getNavs
        }
        
        return service;
        
        ////////////////
        
        function getNavs(){
            $http.get(api)
                    .then(success)
                    .catch(error);
        }
        
        function success(data){
            service.navs = data.data;
            d.resolve();
            return d.promise;
        }
        
        function error(error){
            service.errors = error;
            d.reject();
            return d.promise;
        }
    }
    
})();