/**
 * Created by Mark on 09/01/2015.
 */

var queryApp = angular.module("queryApp", [
    'wj',
    'ngSanitize',
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.aside',
    'ui.select',
    'http-post-fix',
    'angular-loading-bar'
])


    .controller("HomeController", function ($scope, DataFactory, KeywordsFactory, DataFilter, $aside, $sce, DominoFactory) {

        // data context
        $scope.ctx = {
            chart: null,
            itemsSource: []
        };
// populate itemsSource
//        $scope.ctx.itemsSource = [
//            { mon: 'jan', tav: 3.1, tmin: 0.6, tmax: 5.6, prec: 78.7 },
//            { mon: 'feb', tav: 3.2, tmin: 0.3, tmax: 6.2, prec: 52.0 },
//            { mon: 'mar', tav: 5.7, tmin: 2.3, tmax: 9.3, prec: 73.6 },
//            { mon: 'apr', tav: 8.7, tmin: 4.4, tmax: 13.0, prec: 45.9 },
//            { mon: 'may', tav: 12.6, tmin: 8.0, tmax: 17.0, prec: 64.8 },
//            { mon: 'jun', tav: 15.3, tmin: 10.8, tmax: 19.6, prec: 70.9 },
//            { mon: 'jul', tav: 17.2, tmin: 12.9, tmax: 21.4, prec: 70.2 },
//            { mon: 'aug', tav: 17.2, tmin: 12.8, tmax: 21.6, prec: 74.2 },
//            { mon: 'sep', tav: 14.7, tmin: 10.7, tmax: 18.6, prec: 83.4 },
//            { mon: 'oct', tav: 10.9, tmin: 7.4, tmax: 14.4, prec: 92.3 },
//            { mon: 'nov', tav: 6.9, tmin: 4.0, tmax: 9.5, prec: 83.8 },
//            { mon: 'dec', tav: 4.1, tmin: 1.5, tmax: 6.5, prec: 83.0 }
//        ];

        $scope.$watch('ctx.chart', function () {
            if ($scope.ctx.chart) {
                var chart = $scope.ctx.chart;

                chart.axisX.labelAngle = 0;
                chart.axisY.title = 'temperature, C';
                chart.axisY.min = 0; chart.axisY.max = 20;

                var ay2 = new wijmo.chart.Axis(wijmo.chart.Position.Right);
                ay2.min = 0; ay2.max = 100;
                ay2.title = 'precipitation, mm';
                chart.series[0].axisY = ay2;
            }
        });

        $scope.loadData = function () {
            DataFactory.loadData().then(function success(result) {
                var onTime = 0;
                var total = 0;
                for (var i = 0; i < result.data.length; i++) {
                    onTime += result.data[i].OnTime;
                    total += result.data[i].Total;
                }
                // expose data as a CollectionView to get events
                $scope.listByOrderType = result.data.orderData;
                $scope.listAll = new wijmo.collections.CollectionView(result.data.orderData);
                $scope.kpi = result.data.kpi;

                //Calculate Percentage
                $scope.anythingSummaryOnTime = onTime / (total / 100);
            })
        };

        $scope.loadKeywords = function () {
            KeywordsFactory.loadKeywords().then(function success(result) {
                $scope.keywordsHospitals = result.data.hospitals;
                $scope.keywordsOrderTypes = result.data.orderType;
                $scope.keywordsOrthotists = result.data.orthotists;
                $scope.keywordsReportMonths = result.data.reportMonths;
            })
        }

        $scope.clearResult = function () {
            $scope.resultData="";
            $scope.formObj={};
            $scope.setDefaults();
        }

        $scope.setDefaults = function(){
            $scope.formObj = {}
            $scope.formObj.Summary="Summary";
            $scope.formObj.ReportType="ByOrder";
            $scope.formObj.DateType="Month";
        }
        $scope.loadData();
        $scope.setDefaults();
        $scope.loadKeywords();




        $scope.postQuery = function () {
            //
            //if($scope.formObj.ReportType=='ByOrder' && $scope.formObj.OrderFilterList.length == 0 ){
            //    alert('bad type');
            //    return false
            //}else if( $scope.formObj.TopLevelFilterList.length == 0 ){
            //    alert('bad other type');
            //    return false
            //}

            //Because we are dealing with Domino & CORS we cant use the REST API because of the limit of 3 headers in the website rules
            //So we have converted to the old fashioned POST method
            //One problem with this is multi value fields so we need to implode them
            if ($scope.formObj.OrderFilterList) {
                $scope.formObj.OrderFilterListImp = $scope.formObj.OrderFilterList.join("@")
            }

            if ($scope.formObj.TopLevelFilterList) {
                $scope.formObj.TopLevelFilterListImp = $scope.formObj.TopLevelFilterList.join("@")
            }

            DominoFactory.postOptions($scope.formObj).then(function (success) {
                $scope.resultData = "";
                $scope.resultData = success.data;


                /*  //Now call the Agent to process it - passing the UNID as the arguement
                 DominoFactory.runQueryAgent(unid).then(function(success){
                 console.log(success)
                 })*/
            })
        }

    });

queryApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
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
