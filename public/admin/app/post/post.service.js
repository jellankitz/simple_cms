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
            deletePost: deletePost,
            getPosts: getPosts,
            activate: activate
        }

        service.activate();
        
        return service;
        
        //////// SERIVCE METHODS ////////
        
        function activate(){
            return service.getPosts();
        }
        
        function addPost(data) {
            var addUrl = api + "add/";
            var d = $q.defer();

            $http.post(addUrl, data)
                    .then(function (resp) {
                        console.log(resp);
                        var newPosts = HelperService.addToList(service.posts, resp.data.new_post);
                        service.posts = newPosts;
                        d.resolve(resp);
                    }).catch(function(error){
                        console.log(error.data);
                        service.errors = error;
                        d.reject(error);
                    });

            return d.promise;
        }
        
        function deletePost(id){
            var deletUrl = api + "delete/" + id;
            var d = $q.defer();
            
            $http.post(deletUrl, {})
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

        function getPosts() {
            var d = $q.defer();
            
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
    }

})();