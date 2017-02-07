(function() {
    'use strict';

    angular.module('app')
        .config(config)
        .run(run);

    config.$inject = ['$authProvider', '$resourceProvider','CONST'];

    /* @ngInject */
    function config($authProvider, $resourceProvider, CONST) {

        $authProvider.loginUrl = CONST.api_domain+'authenticate';
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }

    run.$inject = ['$rootScope', '$state', '$auth', 'bootstrap3ElementModifier'];
    /* @ngInject */
    function run($rootScope, $state, $auth, bootstrap3ElementModifier) {
        bootstrap3ElementModifier.enableValidationStateIcons(true);

        // $stateChangeStart is fired whenever the state changes. We can use some parameters
        // such as toState to hook into details about the state as it is changing
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            
            if (localStorage.getItem('user') != 'undefined') {
                // Grab the user from local storage and parse it to an object
                var user = JSON.parse(localStorage.getItem('user'));

                // If there is any user data in local storage then the user is quite
                // likely authenticated. If their token is expired, or if they are
                // otherwise not actually authenticated, they will be redirected to
                // the auth state because of the rejected request anyway
                if (user && $auth.isAuthenticated()) {
                    // The user's authenticated state gets flipped to
                    // true so we can now show parts of the UI that rely
                    // on the user being logged in
                    $rootScope.authenticated = true;

                    // Putting the user's data on $rootScope allows
                    // us to access it anywhere across the app. Here
                    // we are grabbing what is in local storage
                    $rootScope.currentUser = user;
                    
                    // If the user is logged in and we hit the auth route we don't need
                    // to stay there and can send the user to the main state
                    if (toState.name === "auth") {
                        // Preventing the default behavior allows us to use $state.go
                        // to change states
                        event.preventDefault();

                        // go to the "main" state which in our case is users
                        $state.go('dashboard');
                    }
                } else {
                    // Remove the authenticated user from local storage
                    localStorage.removeItem('user');
                    // Flip authenticated to false so that we no longer
                    // show UI elements dependant on the user being logged in
                    $rootScope.authenticated = false;

                    // Remove the current user info from rootscope
                    $rootScope.currentUser = null;

                    if (toState.name !== "auth") {
                        event.preventDefault();
                        $state.go('auth');
                    }
                }
            } 
        });
    }
})();