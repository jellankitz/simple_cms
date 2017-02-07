(function() {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['UserService', 'usersPrepService'];

    /* @ngInject */
    function DashboardController(UserService, usersPrepService) {
        var vm = this;

        vm.users = usersPrepService;
        vm.getUsers = getUsers;

        activate();

        //////////////

        function activate() {
            return getUsers();
        }

        function getUsers() {
            return UserService.getUsers().then(function(data) {
                vm.users = data;
                return vm.users;
            });
        }
    }
})();