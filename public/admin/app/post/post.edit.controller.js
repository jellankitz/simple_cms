(function() {
    'use strict';

    angular.module('app')
        .controller('PostEditController', PostEditController);

    PostEditController.$inject = ['PostService', 'HelperService', '$stateParams', 'categoryPrepService', 'tagPrepService'];

    /* @ngInject */
    function PostEditController(PostService, HelperService, $stateParams, categoryPrepService, tagPrepService) {
        var vm = this;

        vm.mode = "Edit";
        vm.postId = $stateParams.id;
        vm.selectedPost = PostService.getPost(vm.postId);
        vm.postForm = vm.selectedPost;
        vm.response = {};
        vm.isDone = false;
        vm.categories = categoryPrepService;
        vm.defaultCategory = vm.selectedPost.category_id;
        vm.tags = tagPrepService;
        vm.defaultTags = vm.selectedPost.tags;

        vm.prevState = HelperService.getPrevState();
        vm.submitAction = editPost;

        ///////////////////

        function editPost() {
            PostService.editPost(vm.postForm).then(function() {
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Updated post.";
                vm.isDone = true;
            }).catch(function() {
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to update post.";
                vm.isDone = true;
            });
        }
    }
})();