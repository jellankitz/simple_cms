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

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            
            if (localStorage.getItem('user') != 'undefined') {
                var user = JSON.parse(localStorage.getItem('user'));
                if (user && $auth.isAuthenticated()) {
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = user;
                    
                    if (toState.name === "auth") {
                        event.preventDefault();
                        $state.go('dashboard');
                    }
                } else {
                    localStorage.removeItem('user');
                    $rootScope.authenticated = false;
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