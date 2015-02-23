/**
 * Created by StevenChapman on 13/02/15.
 */
var app=angular.module("queryApp")
app.factory('DominoFactory',function DominoFactory($http){

    return{
        postOptions:postOptions,
        runQueryAgent:runQueryAgent,
        getKeywordData:getKeywordData,
        runCachedReport:runCachedReport
    }

    function postOptions(optionsData){
        return $http({
            method: 'POST',
            url: 'http://31.49.243.186/org/orderconfig.nsf/DashboardOptions?createdocument',
            data:optionsData
        });
    }

    function runQueryAgent(unid){
        return $http({
            method: 'GET',
            url:'http://31.49.243.186/org/orderconfig.nsf/Report2?openagent&unid='+unid
        });
    }


    function getKeywordData(){
        return $http({
            method: 'GET',
            url:'http://31.49.243.186/org/orderconfig.nsf/DashboardKeywordData'
        });
    }

    function runCachedReport(u){
        return $http({
            method: 'GET',
            url:'http://31.49.243.186/'+u
        });
    }

})
