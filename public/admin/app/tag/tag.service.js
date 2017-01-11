(function(){
    'use strict';
    
    angular.module('app')
            .factory('TagService', TagService);
    
    TagService.$inject = ['$http', 'CONST', '$q'];
    
    /* @ngInject */
    function TagService($http, CONST, $q){
        var api = CONST.api_domain + 'tag/';
        var d = $q.defer();
        
        var service = {
            tags: {},
            errors: {},
            getTags: getTags
        }
        
        return service;
        
        ////////////////
        
        function getTags(){
            $http.get(api)
                    .then(success)
                    .catch(error);
        }
        
        function success(data){
            service.tags = data.data;
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