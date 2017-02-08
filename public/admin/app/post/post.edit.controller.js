(function() {
    'use strict';

    angular.module('app')
        .controller('PostEditController', PostEditController);

    PostEditController.$inject = ['PostService', 'HelperService', '$stateParams', 'categoryPrepService', 'tagPrepService','$scope'];

    /* @ngInject */
    function PostEditController(PostService, HelperService, $stateParams, categoryPrepService, tagPrepService, $scope) {
        var vm = this;

        vm.mode = "Edit";
        vm.postForm = {};
        vm.response = {};
        vm.postId = $stateParams.id;
        vm.selectedPost = null;
        vm.isDone = false;
        vm.categories = categoryPrepService;
        vm.tags = tagPrepService;

        vm.prevState = HelperService.getPrevState();
        vm.submitAction = editPost;
        
        activate();
        
        ///////////////////
        
        function activate(){
            PostService.getPost(vm.postId).then(function(data){
                vm.selectedPost = data;
                vm.postForm = vm.selectedPost;
                vm.postForm.category = vm.selectedPost.category_id;
                vm.postForm.temp_tags = getTags();
            });
        }
        
        function editPost() {
            var tags = vm.postForm.temp_tags != undefined ? vm.postForm.temp_tags.split(" ") : "";
            vm.postForm.tags = tags;
            
            PostService.editPost(vm.postForm).then(function() {
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Updated post.";
                vm.isDone = true;
                $scope.$parent.vm.getPosts();
            }).catch(function() {
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to update post.";
                vm.isDone = true;
            });
        }
        
        function getTags(){
            var postTags = vm.selectedPost.tags;
            var tags = '';
            var len = postTags.length;
            
            if(len > 0){
                for(var i = 0; i < len; i++){
                    tags += postTags[i].name+' ';
                }
            }
            
            return tags.trim();
        }
    }
})();