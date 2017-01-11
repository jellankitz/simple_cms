(function(){
    'use strict';
    
    angular.module('app')
            .controller('CategoryController', CategoryController);
    
    CategoryController.$inject = ['categoryPrepService'];
    
    /* @ngInject */
    function CategoryController(categoryPrepService){
        var vm = this;
        vm.categories = categoryPrepService.categories;
        vm.error = categoryPrepService.errors;
        
    }
})();