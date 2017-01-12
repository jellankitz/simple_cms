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
        
        vm.prevState = HelperService.getPrevState();
        vm.addPost = addPost;
        
        ///////////////////
        
        function addPost(){
            var data = setData();
            PostService.addPost(data);
        }
        
        function setData(){
            return {
                title: vm.title,
                content: vm.content
            };
        }
    }
})();