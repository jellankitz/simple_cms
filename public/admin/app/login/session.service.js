(function() {
    'use strict';

    angular.module('app')
        .service('Session', Session);

    function Session() {
        var self = this;

        self.user = null;
        self.create = create;
        self.destroy = destroy;

        ////////////////

        function create(authUser) {
            self.user = authUser;
        }

        function destroy() {
            self.user = null;
        }
    }

})();