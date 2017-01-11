(function () {
    'use strict';

    angular.module('app')
            .config(config)
            .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider', '$resourceProvider'];

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $authProvider, $resourceProvider) {

        $authProvider.loginUrl = 'http://localhost:8000/api/authenticate';

        // For any unmatched url, redirect to /login 
        $urlRouterProvider.otherwise("/auth");
        
        //admin navigation menu
        var nav = {
            templateUrl: "./admin/app/nav/nav.html",
            controller: "NavController",
            controllerAs: "vm",
            resolve: {
                navPrepService: navPrepService
            }
        };

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
                        "nav": nav
                    }
                }).state("post", {
                    url: "/post",
                    views: {
                        "main": {
                            templateUrl: "./admin/app/post/post.html",
                            controller: "PostController",
                            controllerAs: "vm",
                            resolve: {
                                auth: doAuth,
                                postPrepService: postPrepService
                            }
                        },
                        "nav": nav
                    }
                }).state("category", {
                    url: "/category",
                    views: {
                        "main": {
                            templateUrl: "./admin/app/category/category.html",
                            controller: "CategoryController",
                            controllerAs: "vm",
                            resolve: {
                                auth: doAuth,
                                categoryPrepService: categoryPrepService
                            }
                        },
                        "nav": nav
                    }
                }).state("tag", {
                    url: "/tag",
                    views: {
                        "main": {
                            templateUrl: "./admin/app/tag/tag.html",
                            controller: "TagController",
                            controllerAs: "vm",
                            resolve: {
                                auth: doAuth,
                                tagPrepService: tagPrepService
                            }
                        },
                        "nav": nav
                    }
                });

        $resourceProvider.defaults.stripTrailingSlashes = false;

        ////////////
        
        navPrepService.$inject = ['NavService'];
        /* @ngInject */
        function navPrepService(NavService){
            NavService.getNavs();
            return NavService;
        }
        
        usersPrepService.$inject = ['UserService'];
        /* @ngInject */
        function usersPrepService(UserService) {
            UserService.getUsers();
            return UserService;
        }
        
        postPrepService.$inject = ['PostService'];
        /* @ngInject */
        function postPrepService(PostService){
            PostService.getPosts();
            return PostService;
        }
        
        categoryPrepService.$inject = ['CategoryService'];
        /* @ngInject */
        function categoryPrepService(CategoryService){
            CategoryService.getCategories();
            return CategoryService;
        }
        
        tagPrepService.$inject = ['TagService'];
        /* @ngInject */
        function tagPrepService(TagService){
            TagService.getTags();
            return TagService;
        }
        
        doAuth.$inject = ['$auth', '$q', '$injector'];
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

    run.$inject = ['$rootScope', '$state', '$auth'];
    /* @ngInject */
    function run($rootScope, $state, $auth) {
        // $stateChangeStart is fired whenever the state changes. We can use some parameters
        // such as toState to hook into details about the state as it is changing
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            
            if(localStorage.getItem('user') != 'undefined'){
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
                }else{
                    // Remove the authenticated user from local storage
                    localStorage.removeItem('user');
                    // Flip authenticated to false so that we no longer
                    // show UI elements dependant on the user being logged in
                    $rootScope.authenticated = false;

                    // Remove the current user info from rootscope
                    $rootScope.currentUser = null;
                }
            }
        });
    }
})();