/**
 * Created by Mark on 09/01/2015.
 */

var queryApp = angular.module("queryApp",[
    'wj',
    'ngSanitize',
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.aside',
    'ui.select'
])

.controller("HomeController",function($scope, DataFactory, KeywordsFactory, DataFilter, $aside, $sce) {

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






