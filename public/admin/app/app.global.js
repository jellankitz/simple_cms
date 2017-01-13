(function(){
    'use strict';
    
    angular.module('app')
            .factory('HelperService', HelperService);
    
    HelperService.$inject = ['$state'];
    
    /* @ngInject */
    function HelperService($state){
        var service = {
            getCurrentState: getCurrentState,
            getPrevState: getPrevState,
            removeFromList: removeFromList,
            addToList: addToList
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
        
        function removeFromList(attr, id){
            for(var x = 0; x < attr.length; x++){
                if(attr[x].id == id){
                    attr.splice(x,1);
                }
            }
            
            return attr;
        }
        
        function addToList(attr, newData){
            attr.push(newData);
            
            return attr;
        }
    }
    
})();