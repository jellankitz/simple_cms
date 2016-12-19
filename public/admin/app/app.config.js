(function () {
    'use strict';

    angular.module('app')
            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider', '$resourceProvider'];

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $authProvider, $resourceProvider) {

        $authProvider.loginUrl = 'http://localhost:8000/api/authenticate';

        // For any unmatched url, redirect to /login 
        $urlRouterProvider.otherwise("/auth");

        $stateProvider
                .state("auth", {
                    url: "/auth",
                    views: {
                        "main": {
                            templateUrl: "./admin/app/login/login.html",
                            controller: "LoginController",
                            controllerAs: "vm"
                        }
                    }
                })
                .state("dashboard", {
                    url: "/dashboard",
                    views: {
                        "main": {
                            templateUrl: "./admin/app/dashboard/dashboard.html",
                            controller: "DashboardController",
                            controllerAs: "vm",
                            resolve: {
                                auth: doAuth,
                                usersPrepService: usersPrepService
                            }
                        },
                        "nav": {
                            templateUrl: "./admin/app/nav/nav.html",
                            controller: "NavController",
                            controllerAs: "vm"
                        }
                    }
                });

        $resourceProvider.defaults.stripTrailingSlashes = false;

        ////////////

        usersPrepService.$inject = ['UserService'];
        /* @ngInject */
        function usersPrepService(UserService) {
            UserService.getUsers();
            return UserService;
        }

        doAuth.$inject = ['$auth', '$q','$injector'];
        /* @ngInject */
        function doAuth($auth, $q, $injector) {
            var deferred = $q.defer();
            var $state = $injector.get('$state');
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                deferred.reject();
                $state.go('auth');
            }
            return deferred.promise;
        }
    }
})();