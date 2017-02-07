(function() {
    'use strict';

    angular.module('app')
        .controller('PostAddController', PostAddController);

    PostAddController.$inject = ['PostService', 'HelperService', 'categoryPrepService', 'tagPrepService', '$scope'];

    /* @ngInject */
    function PostAddController(PostService, HelperService, categoryPrepService, tagPrepService, $scope) {
        var vm = this;

        vm.mode = "Add";
        vm.postForm = {};
        vm.response = {};
        vm.isDone = false;
        vm.categories = categoryPrepService;
        vm.defaultCategory = vm.categories[0].id;
        vm.tags = tagPrepService;

        vm.prevState = HelperService.getPrevState();
        vm.submitAction = addPost;

        ///////////////////

        function addPost() {
            var tags = vm.postForm.temp_tags != undefined ? vm.postForm.temp_tags.split(" ") : "";
            vm.postForm.tags = tags;
            //console.log(vm.postForm); return false;
            PostService.addPost(vm.postForm).then(function() {
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Added new post.";
                vm.isDone = true;
                //HelperService.getParent().getPosts();
                $scope.$parent.vm.getPosts();
            }).catch(function() {
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to add new post.";
                vm.isDone = true;
            });
        }
    }
})();