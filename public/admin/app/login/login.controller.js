(function(){
    'use strict';
    
    angular.module('app')
            .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth','$state','$http', '$rootScope'];
    
    /* @ngInject */
    function LoginController($auth, $state, $http, $rootScope){
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
                return $http.get('api/authenticate/user');
                
            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;
                
                return false;
            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
            }).then(function(response) {
                if(response === false){
                    return false;
                }
                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('dashboard');
            });
        }
    }
})();