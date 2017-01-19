(function () {
    'use strict';

    angular.module('app')
            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /login 
        $urlRouterProvider.otherwise("/auth");
        
        //////STATES//////

        //admin navigation menu
        var nav = {
            templateUrl: "./admin/app/nav/nav.html",
            controller: "NavController",
            controllerAs: "vm",
            resolve: {
                navPrepService: navPrepService
            }
        };

        var auth = {
            name: "auth",
            url: "/auth",
            views: {
                "main": {
                    templateUrl: "./admin/app/login/login.html",
                    controller: "LoginController",
                    controllerAs: "vm"
                }
            }
        };

        var dashboard = {
            name: "dashboard",
            url: "/",
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
        };

        var post = {
            name: "post",
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
        };
        
        var postAdd = {
            name: "post.add",
            url: "/add",
            parent: post,
            views: {
                "page_body": {
                    templateUrl: "./admin/app/post/post.add.html",
                    controller: "PostAddController",
                    controllerAs: "vm",
                    resolve: {
                        auth: doAuth
                    }
                }
            }
        };
        
        var postEdit = {
            name: "post.edit",
            url: "/edit/:id",
            parent: post,
            views: {
                "page_body": {
                    templateUrl: "./admin/app/post/post.add.html",
                    controller: "PostEditController",
                    controllerAs: "vm",
                    resolve: {
                        auth: doAuth
                    }
                }
            }
        };

        var category = {
            name: "category",
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
        };

        var tag = {
            name: "tag",
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
        };
        
        ////////////
        
        $stateProvider
                .state(auth)
                .state(dashboard)
                .state(post)
                .state(postAdd)
                .state(postEdit)
                .state(category)
                .state(tag);
        
        ////////////

        navPrepService.$inject = ['NavService'];
        /* @ngInject */
        function navPrepService(NavService) {
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
        function postPrepService(PostService) {
            return PostService;
        }

        categoryPrepService.$inject = ['CategoryService'];
        /* @ngInject */
        function categoryPrepService(CategoryService) {
            CategoryService.getCategories();
            return CategoryService;
        }

        tagPrepService.$inject = ['TagService'];
        /* @ngInject */
        function tagPrepService(TagService) {
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

})();