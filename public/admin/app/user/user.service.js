(function() {
    'use strict';

    angular.module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'CONST', '$q'];

    /* @ngInject */
    function UserService($http, CONST, $q) {
        var api = CONST.api_domain + 'user/';
        var d = $q.defer();

        var service = {
            users: [],
            errors: [],
            getUsers: getUsers
        }

        return service;

        ////////////////

        function getUsers() {
            var d = $q.defer();

            $http.get(api)
                .then(function(data) {
                    d.resolve(data.data);
                })
                .catch(function(error) {
                    service.errors = error;
                    d.reject();
                });

            return d.promise;
        }
    }

})();