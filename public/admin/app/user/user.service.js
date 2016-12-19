(function(){
    'use strict';
    
    angular.module('app')
            .factory('UserService', UserService);
    
    UserService.$inject = ['$http', 'CONST', '$q'];
    
    /* @ngInject */
    function UserService($http, CONST, $q){
        var api = CONST.api_domain + 'authenticate/';
        var d = $q.defer();
        var service = {
            users: {},
            errors: {},
            getUsers: getUsers
        }
        
        return service;
        
        ////////////////
        
        function getUsers(){
            $http.get(api)
                    .then(success)
                    .catch(error);
        }
        
        function success(data){
            service.users = data.data;
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