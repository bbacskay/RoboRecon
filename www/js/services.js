angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('CommonData', [function(){
    var adminMode = false;
    
    return {
        getAdminMode: function() {
            return adminMode;
        },
  
        setAdminMode: function(mode) {
            adminMode = mode;
        }
    };
}])
