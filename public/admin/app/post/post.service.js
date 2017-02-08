(function() {
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
            getPost: getPost
        }

        return service;

        //////// SERIVCE METHODS ////////

        function getPosts() {
            var d = $q.defer();

            //HelperService.emptyList(service.posts);

            $http.get(api)
                .then(function(data) {
                    //console.log(data);
                    //service.posts = data.data;
                    d.resolve(data.data);
                })
                .catch(function(error) {
                    //console.log(error.data);
                    service.errors = error;
                    d.reject(error);
                });

            return d.promise;
        }

        function getPost(id) {
            var d = $q.defer();

            $http({
                method: 'GET',
                url: api+id,
                //params: {id: id}
                })
                .then(function(data) {
                    d.resolve(data.data);
                })
                .catch(function(error) {
                    service.errors = error;
                    d.reject(error);
                });

            return d.promise;
        }

        function addPost(data) {
            var url = api + "add/";
            var d = $q.defer();
            console.log(data);
            $http.post(url, data)
                .then(function(resp) {
                    d.resolve(resp);
                }).catch(function(error) {
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
                .then(function(resp) {
                    d.resolve(resp);
                }).catch(function(error) {
                    console.log(error.data);
                    service.errors = error;
                    d.reject(error);
                });

            return d.promise;
        }

        function deletePost(id) {
            var url = api + "delete/" + id;
            var d = $q.defer();

            $http.post(url, {})
                .then(function(resp) {
                    //var newPosts = HelperService.removeFromList(service.posts, id);
                    //service.posts = newPosts;
                    getPosts();
                    d.resolve(resp);
                }).catch(function(error) {
                    console.log(error.data);
                    service.errors = error;
                    d.reject(error);
                });

            return d.promise;
        }
    }

})();