(function(){
    'use strict';
    
    angular.module('app')
            .controller('PostAddController', PostAddController);
    
    PostAddController.$inject = ['PostService','HelperService'];
    
    /* @ngInject */
    function PostAddController(PostService, HelperService){
        var vm = this;
        
        vm.mode = "Add";
        vm.title = "";
        vm.content = "";
        vm.response = {};
        vm.isDone = false;
        
        vm.prevState = HelperService.getPrevState();
        vm.submitAction = addPost;
        
        ///////////////////
        
        function addPost(){
            var data = setData();
            PostService.addPost(data).then(function(){
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Added new post.";
                vm.isDone = true;
            }).catch(function(){
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to add new post.";
                vm.isDone = true;
            });
        }
        
        function setData(){
            return {
                title: vm.title,
                content: vm.content
            };
        }
    }
})();