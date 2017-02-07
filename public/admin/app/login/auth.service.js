(function() {
    'use strict';

    angular.module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$auth', '$rootScope', '$http', '$q', '$injector'];

    /* @ngInject */
    function AuthService($auth, $rootScope, $http, $q, $injector) {
        var service = {
            login: login,
            errors: [],
            isAuthenticated: isAuthenticated,
            createAuthUser: createAuthUser,
            destroyAuthUser: destroyAuthUser,
            getAuthUser: getAuthUser
        }

        return service;

        ////////////////

        function login(email, password) {
            var d = $q.defer();

            var credentials = {
                email: email,
                password: password
            }

            $auth.login(credentials).then(function(data) {
                return $http.get('api/authenticate/user');
            }, function(error) {
                service.errors = error.data.error;
                d.reject(service.errors);
                throw (service.errors);
            }).then(function(response) {
                if (typeof response === 'undefined' || response === false) {
                    d.reject();
                } else {
                    var user = JSON.stringify(response.data.user);

                    localStorage.setItem('user', user);
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = response.data.user;

                    d.resolve();
                }

            });

            return d.promise;
        }

        function isAuthenticated() {
            /*
            if (localStorage.getItem('user') != 'undefined') {
                var user = JSON.parse(localStorage.getItem('user'));

                if (user && $auth.isAuthenticated()) {
                    return true;
                }
            }

            return false;*/

            var d = $q.defer();
            var $state = $injector.get('$state');
            if ($auth.isAuthenticated()) {
                d.resolve();
            } else {
                d.reject();
                $state.go('auth');
            }

            return d.promise;
        }

        function createAuthUser() {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user && $auth.isAuthenticated()) {
                $rootScope.authenticated = true;
                $rootScope.currentUser = user;
            }
        }

        function destroyAuthUser() {
            localStorage.removeItem('user');
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
        }

        function getAuthUser() {
            if (service.isAuthenticated) {
                return JSON.parse(localStorage.getItem('user'));
            }

            return null;
        }
    }

})();