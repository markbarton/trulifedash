/**
 * Created by Mark on 09/01/2015.
 */

var queryApp = angular.module("queryApp",[
    'wj',
    'ngSanitize',
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.aside',
    'ui.select',
    'http-post-fix'
])


.controller("HomeController",function($scope, DataFactory, KeywordsFactory, DataFilter, $aside, $sce,DominoFactory) {

    $scope.selectedTypes = {};

    $scope.loadData=function(){
        DataFactory.loadData().then(function success(result){
            var onTime=0;
            var total=0;
            for (var i = 0; i < result.data.length; i++) {
                 onTime+= result.data[i].OnTime;
                total+=result.data[i].Total;
            }
            // expose data as a CollectionView to get events
            $scope.listByOrderType = result.data.orderData;
            $scope.listAll = new wijmo.collections.CollectionView(result.data.orderData);
            $scope.kpi=result.data.kpi;

            //Calculate Percentage
              $scope.anythingSummaryOnTime=onTime/(total/100);
        })
    };

    $scope.loadKeywords = function(){
        KeywordsFactory.loadKeywords().then(function success(result){
            $scope.keywordsHospitals=result.data.hospitals;
            $scope.keywordsOrderTypes=result.data.orderType;
            $scope.keywordsOrthotists=result.data.orthotists;
            $scope.keywordsReportMonths=result.data.reportMonths;
        })
    }

    $scope.loadData();
    $scope.loadKeywords();
    //$scope.loadHospitalData();
    //$scope.loadOthordistData();

        $scope.formObj={}

        $scope.postQuery=function(){

            //Because we are dealing with Domino & CORS we cant use the REST API because of the limit of 3 headers in the website rules
            //So we have converted to the old fashioned POST method
            //One problem with this is multi value fields so we need to implode them
            if($scope.formObj.OrderFilterList ){
                $scope.formObj.OrderFilterListImp=$scope.formObj.OrderFilterList.join("@")
            }

            if($scope.formObj.TopLevelFilterList ){
                $scope.formObj.TopLevelFilterListImp=$scope.formObj.TopLevelFilterList.join("@")
            }

            DominoFactory.postOptions($scope.formObj).then(function (success){
                $scope.result=""
                $scope.result=success.data;


                /*  //Now call the Agent to process it - passing the UNID as the arguement
                 DominoFactory.runQueryAgent(unid).then(function(success){
                 console.log(success)
                 })*/
            })
        }

    });

queryApp.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});


angular.module('http-post-fix', [], function ($httpProvider) {
    // This code is taken from http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, subName, fullSubName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});
