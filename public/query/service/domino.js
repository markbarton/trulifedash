/**
 * Created by StevenChapman on 13/02/15.
 */
var app=angular.module("queryApp")
app.factory('DominoFactory',function DominoFactory($http){

    return{
        postOptions:postOptions,
        runQueryAgent:runQueryAgent
    }

    function postOptions(optionsData){
        return $http({
            method: 'POST',
            url: 'http://virtualplace.co.uk/org/orderconfig.nsf/DashboardOptions?createdocument',
            data:optionsData
        });
    }


    function runQueryAgent(unid){
        console.log("unid = " + unid)
        return $http({
            method: 'GET',
            url:'http://virtualplace.co.uk/org/orderconfig.nsf/Report2?openagent&unid='+unid
        });
    }

})
