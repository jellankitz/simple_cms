(function(){
    'use strict';
    
    angular.module('app')
            .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth','$state'];
    
    /* @ngInject */
    function LoginController($auth, $state){
        var vm = this;
        
        vm.email = "";
        vm.password = "";
        vm.login = login;
        
        ///////////
        
        function login(){
            
            var credentials = {
                email: vm.email,
                password: vm.password
            }
            
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(data) {
                // If login is successful, redirect to dashboard state
                $state.go('dashboard', {});
            });
        }
    }
})();