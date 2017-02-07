(function() {
    'use strict';

    angular.module('app')
        .factory('TagService', TagService);

    TagService.$inject = ['$http', 'CONST', '$q', 'AuthService', 'HelperService'];

    /* @ngInject */
    function TagService($http, CONST, $q, AuthService, HelperService) {
        var api = CONST.api_domain + 'tag/';

        var service = {
            tags: [],
            errors: [],
            getTags: getTags
        }

        return service;

        ////////////////

        function getTags() {
            var d = $q.defer();

            HelperService.emptyList(service.tags);

            $http.get(api)
                .then(function(data) {
                    //service.tags = data.data;
                    d.resolve(data.data);
                })
                .catch(function(error) {
                    throw (error);
                    service.errors = error;
                    d.reject();
                });

            return d.promise;
        }
    }

})();