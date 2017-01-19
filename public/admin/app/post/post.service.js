(function () {
    'use strict';

    angular.module('app')
            .factory('PostService', PostService);

    PostService.$inject = ['$http', 'CONST', '$q', 'HelperService'];

    /* @ngInject */
    function PostService($http, CONST, $q, HelperService) {
        var api = CONST.api_domain + 'post/';

        var service = {
            posts: [],
            errors: [],
            addPost: addPost,
            editPost: editPost,
            deletePost: deletePost,
            getPosts: getPosts,
            activate: activate,
            getPost: getPost
        }

        service.activate();
        
        return service;
        
        //////// SERIVCE METHODS ////////
        
        function activate(){
            return service.getPosts();
        }
        
        function getPosts() {
            var d = $q.defer();
            
            service.posts = [];
            
            $http.get(api)
                    .then(function (data) {
                        service.posts = data.data;
                        d.resolve(data);
                    })
                    .catch(function (error) {
                        console.log(error.data);
                        service.errors = error;
                        d.reject(error);
                    });

            return d.promise;
        }
        
        function getPost(id) {
            var selId = parseInt(id);
            for (var i = 0; i < service.posts.length; i++) {
                var obj = service.posts[i];
                if (obj.id == selId) {
                    return obj;
                }

            }
        }
        
        function addPost(data) {
            var url = api + "add/";
            var d = $q.defer();

            $http.post(url, data)
                    .then(function (resp) {
                        HelperService.refreshList(service.posts, resp.data.data);
                        d.resolve(resp);
                    }).catch(function(error){
                        console.log(error.data);
                        service.errors = error;
                        d.reject(error);
                    });

            return d.promise;
        }
        
        function editPost(data) {
            var url = api + "edit/";
            var d = $q.defer();

            $http.post(url, data)
                    .then(function (resp) {
                        HelperService.refreshList(service.posts, resp.data.data);
                        d.resolve(resp);
                    }).catch(function(error){
                        console.log(error.data);
                        service.errors = error;
                        d.reject(error);
                    });

            return d.promise;
        }
        
        function deletePost(id){
            var url = api + "delete/" + id;
            var d = $q.defer();
            
            $http.post(url, {})
                    .then(function (resp) {
                        var newPosts = HelperService.removeFromList(service.posts, id);
                        service.posts = newPosts;
                        d.resolve(resp);
                    }).catch(function(error){
                        console.log(error.data);
                        service.errors = error;
                        d.reject(error);
                    });

            return d.promise;
        }
    }

})();