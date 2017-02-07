(function() {
    'use strict';

    angular.module('app')
        .controller('TagController', TagController);

    TagController.$inject = ['TagService', 'tagPrepService'];

    /* @ngInject */
    function TagController(TagService, tagPrepService) {
        var vm = this;

        vm.tags = tagPrepService;
        vm.getTags = getTags;

        activate();

        /////////////////

        function activate() {
            return getTags();
        }

        function getTags() {
            return TagService.getTags().then(function(data) {
                vm.tags = data;
                return vm.tags;
            });
        }
    }
})();