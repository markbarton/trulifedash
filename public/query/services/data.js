var app = angular.module("queryApp");
app.factory('DataFactory',function DataFactory($http){

    return{
        loadData:loadData
    }


    function loadData(){
        return $http({
            method: 'GET',
            url: '../query/data/sample.json'
        });
    }

})