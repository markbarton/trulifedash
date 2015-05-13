/**
 * Created by StevenChapman on 13/02/15.
 */
var app=angular.module("queryApp")
app.factory('DominoFactory',function DominoFactory($http){
    var baseURL= 'http://217.43.169.219';
    return{
        postOptions:postOptions,
        runQueryAgent:runQueryAgent,
        getKeywordData:getKeywordData,
        runCachedReport:runCachedReport,
        runHomePageCachedReport:runHomePageCachedReport
    }

    function postOptions(optionsData){
        return $http({
            method: 'POST',
            url: baseURL+'/org/orderconfig.nsf/DashboardOptions?createdocument',
            data:optionsData
        });
    }

    function runQueryAgent(unid){
        return $http({
            method: 'GET',
            url:baseURL+'/org/orderconfig.nsf/Report2?openagent&unid='+unid
        });
    }


    function getKeywordData(){
        return $http({
            method: 'GET',
            url:baseURL+'/org/orderconfig.nsf/DashboardKeywordData'
        });
    }

    function runCachedReport(u){
        return $http({
            method: 'GET',
            url:baseURL+u
        });
    }

    function runHomePageCachedReport(u){
        return $http({
            method: 'GET',
            url:baseURL+u
        });
    }

})
