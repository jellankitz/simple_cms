(function(){
    'use strict';
    
    angular.module('app')
            .factory('HelperService', HelperService);
    
    HelperService.$inject = ['$state'];
    
    /* @ngInject */
    function HelperService($state){
        var service = {
            getCurrentState: getCurrentState,
            getPrevState: getPrevState
        }
        
        return service;
        
        ////////////////
        
        function getCurrentState(){
            return $state;
        }
        
        function getPrevState(){
            var prevState = $state.current.parent;
            
            if(typeof prevState != 'undefined'){
                return prevState;
            }
            
            return false;
        }
    }
    
})();