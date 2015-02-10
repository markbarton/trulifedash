var app = angular.module("queryApp");
app.factory('KeywordsFactory',function KeywordsFactory($http){

    return{
        loadKeywords:loadKeywords
    }


    function loadKeywords(){
        return $http({
            method: 'GET',
            url: '../query/data/keywords.json'
        });
    }

})