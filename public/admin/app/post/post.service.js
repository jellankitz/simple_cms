(function(){
    'use strict';
    
    angular.module('app')
            .factory('PostService', PostService);
    
    PostService.$inject = ['$http', 'CONST', '$q'];
    
    /* @ngInject */
    function PostService($http, CONST, $q){
        var api = CONST.api_domain + 'post/';
        var d = $q.defer();
        
        var service = {
            posts: {},
            errors: {},
            getPosts: getPosts
        }
        
        return service;
        
        ////////////////
        
        function getPosts(){
            $http.get(api)
                    .then(success)
                    .catch(error);
        }
        
        function success(data){
            service.posts = data.data;
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