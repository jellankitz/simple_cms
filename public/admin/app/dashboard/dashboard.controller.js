(function(){
    'use strict';
    
    angular.module('app')
            .controller('DashboardController', DashboardController);
    
    DashboardController.$inject = ['usersPrepService'];
    
    /* @ngInject */
    function DashboardController(usersPrepService){
        var vm = this;
        vm.users = usersPrepService.users;
        vm.error = usersPrepService.errors;
        
    }
})();