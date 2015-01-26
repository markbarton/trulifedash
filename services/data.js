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
            url: './data/data.json'

        });
    }
    function loadAnything(){
        return $http({
            method: 'GET',
            url: './data/anything.json'

        });
    }
    function loadBagTruss(){
        return $http({
            method: 'GET',
            url: './data/bagtruss.json'

        });
    }
    function loadBelowKnee(){
        return $http({
            method: 'GET',
            url: './data/belowknee.json'

        });
    }
    function loadBeltCorset(){
        return $http({
            method: 'GET',
            url: './data/beltcorset.json'

        });
    }

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

})