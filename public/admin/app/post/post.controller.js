(function() {
    'use strict';

    angular.module('app')
        .controller('PostController', PostController);

    PostController.$inject = ['PostService', 'postPrepService'];

    /* @ngInject */
    function PostController(PostService, postPrepService) {
        var vm = this;

        vm.posts = postPrepService;
        vm.getPosts = getPosts;
        vm.hasDeleted = false;
        vm.response = {};
        vm.deletePost = deletePost;

        activate();

        ////////////////

        function activate() {
            return getPosts();
        }

        function getPosts() {
            return PostService.getPosts().then(function(data) {
                vm.posts = data;
                return vm.posts;
            });
        }

        function deletePost(post) {
            bootbox.confirm({
                title: "Confirm Delete",
                message: "Are you sure you want to delete post: <b>" + post.title + "</b>?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function(result) {
                    if (result) {
                        doDelete(post.id);
                    }
                }
            });

        }

        function doDelete(id) {
            PostService.deletePost(id).then(function(resp) {
                vm.hasDeleted = true;
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = resp.data.message;
                getPosts();
                vm.hasAdded = true;
            }).catch(function() {
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to delete post.";
                vm.hasAdded = true;
            });
        }
    }
})();