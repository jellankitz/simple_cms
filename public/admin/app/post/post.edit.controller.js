(function(){
    'use strict';
    
    angular.module('app')
            .controller('PostEditController', PostEditController);
    
    PostEditController.$inject = ['PostService','HelperService','$stateParams'];
    
    /* @ngInject */
    function PostEditController(PostService, HelperService, $stateParams){
        var vm = this;
        
        vm.mode = "Edit";
        vm.postId = $stateParams.id;
        vm.selectedPost = PostService.getPost(vm.postId);
        vm.title = vm.selectedPost.title;
        vm.content = vm.selectedPost.content;
        vm.response = {};
        vm.isDone = false;
        
        vm.prevState = HelperService.getPrevState();
        vm.submitAction = editPost;
        
        ///////////////////
        
        function editPost(){
            var data = setData();
            PostService.editPost(data).then(function(){
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Updated post.";
                vm.isDone = true;
            }).catch(function(){
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to update post.";
                vm.isDone = true;
            });
        }
        
        function setData(){
            return {
                id: vm.postId,
                title: vm.title,
                content: vm.content
            };
        }
    }
})();