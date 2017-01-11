(function(){
    'use strict';
    
    angular.module('app')
            .controller('TagController', TagController);
    
    TagController.$inject = ['tagPrepService'];
    
    /* @ngInject */
    function TagController(tagPrepService){
        var vm = this;
        vm.tags = tagPrepService.tags;
        vm.error = tagPrepService.errors;
        
    }
})();