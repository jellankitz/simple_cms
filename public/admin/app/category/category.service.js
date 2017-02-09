(function() {
    'use strict';

    angular.module('app')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http', 'CONST', '$q', 'HelperService'];

    /* @ngInject */
    function CategoryService($http, CONST, $q, HelperService) {
        var api = CONST.api_domain + 'category/';

        var service = {
            categories: [],
            errors: [],
            getCategories: getCategories
        }

        return service;

        ////////////////

        function getCategories() {
            var d = $q.defer();

            HelperService.emptyList(service.categories);

            $http.get(api)
                .then(function(data) {
                    //service.categories = data.data;
                    d.resolve(data.data);
                })
                .catch(function(error) {
                    service.errors = error;
                    d.reject(error);
                });
            return d.promise;
        }
    }

})();