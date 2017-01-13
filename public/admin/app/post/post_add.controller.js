(function(){
    'use strict';
    
    angular.module('app')
            .controller('PostAddController', PostAddController);
    
    PostAddController.$inject = ['PostService','HelperService'];
    
    /* @ngInject */
    function PostAddController(PostService, HelperService){
        var vm = this;
        
        vm.title = "";
        vm.content = "";
        vm.response = {};
        vm.hasAdded = false;
        
        vm.prevState = HelperService.getPrevState();
        vm.addPost = addPost;
        
        ///////////////////
        
        function addPost(){
            var data = setData();
            PostService.addPost(data).then(function(){
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Added new post.";
                vm.hasAdded = true;
            }).catch(function(){
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to add new post.";
                vm.hasAdded = true;
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