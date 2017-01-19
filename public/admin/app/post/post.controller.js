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
        vm.hasDeleted = false;
        vm.response = {};
        
        vm.deletePost = deletePost;
        
        ////////////////
        
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
                callback: function (result) {
                    if(result){
                        doDelete(post.id);
                    }
                }
            });
            
        }
        
        function doDelete(id){
            postPrepService.deletePost(id).then(function (resp) {
                vm.hasDeleted = true;
                
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = resp.data.message;
                vm.posts = postPrepService.posts;
                
                vm.hasAdded = true;
            }).catch(function () {
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to delete post.";
                vm.hasAdded = true;
            });
        }
    }
})();