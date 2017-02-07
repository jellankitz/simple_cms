(function() {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$state'];

    /* @ngInject */
    function LoginController(AuthService, $state) {
        var vm = this;

        vm.email = "";
        vm.password = "";
        vm.login = login;

        ///////////

        function login() {

            AuthService.login(vm.email, vm.password).then(function(response) {
                $state.go('dashboard');
            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error;
            });
        }
    }
})();