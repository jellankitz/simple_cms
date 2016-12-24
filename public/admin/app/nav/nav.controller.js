(function(){
    'use strict';
    
    angular.module('app')
            .controller('NavController', NavController);
    
    NavController.$inject = ['$auth', '$rootScope', 'navPrepService']
    
    /* @ngInject */
    function NavController($auth, $rootScope, navPrepService){
        var vm = this;
        vm.logout = logout;
        vm.navs = navPrepService.navs;
        vm.error = navPrepService.errors;
        
        /////////////
        
        function logout(){
            $auth.logout().then(function() {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');
                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;
            });
        }
    }
})();