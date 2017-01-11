(function(){
    'use strict';
    
    angular.module('app')
            .factory('CategoryService', CategoryService);
    
    CategoryService.$inject = ['$http', 'CONST', '$q'];
    
    /* @ngInject */
    function CategoryService($http, CONST, $q){
        var api = CONST.api_domain + 'category/';
        var d = $q.defer();
        
        var service = {
            categories: {},
            errors: {},
            getCategories: getCategories
        }
        
        return service;
        
        ////////////////
        
        function getCategories(){
            $http.get(api)
                    .then(success)
                    .catch(error);
        }
        
        function success(data){
            service.categories = data.data;
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