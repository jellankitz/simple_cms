(function(){
    'use strict';
    
    angular.module('app')
            .controller('PostController', PostController);
    
    PostController.$inject = ['postPrepService'];
    
    /* @ngInject */
    function PostController(postPrepService){
        var vm = this;
        vm.posts = postPrepService.posts;
        vm.error = postPrepService.errors;
        vm.isAddPost = false;
        
        vm.toggleAddForm = toggleAddForm;
        
        ////////////////
        
        function toggleAddForm(){
            vm.isAddPost = !vm.isAddPost;
        }
    }
})();