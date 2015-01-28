var app = angular.module("dashApp");
app.factory('DataFactory',function DataFactory($http){

    return{
        loadData:loadData,
        loadAnything:loadAnything,
        loadBagTruss:loadBagTruss,
        loadBelowKnee:loadBelowKnee,
        loadBeltCorset:loadBeltCorset
    }


    function loadData(){
        return $http({
            method: 'GET',
            url: '../common/data/data.json'

        });
    }
    function loadAnything(){
        return $http({
            method: 'GET',
            url: '../common/data/anything.json'

        });
    }
    function loadBagTruss(){
        return $http({
            method: 'GET',
            url: '../common/data/bagtruss.json'

        });
    }
    function loadBelowKnee(){
        return $http({
            method: 'GET',
            url: '../common/data/belowknee.json'

        });
    }
    function loadBeltCorset(){
        return $http({
            method: 'GET',
            url: '../common/data/beltcorset.json'

        });
    }

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

})