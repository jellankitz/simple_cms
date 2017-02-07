(function() {
    'use strict';

    angular.module('app')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['CategoryService', 'categoryPrepService'];

    /* @ngInject */
    function CategoryController(CategoryService, categoryPrepService) {
        var vm = this;

        vm.categories = categoryPrepService;
        vm.getCategories = getCategories;

        activate();

        /////////////////

        function activate() {
            return getCategories();
        }

        function getCategories() {
            return CategoryService.getCategories().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

    }
})();