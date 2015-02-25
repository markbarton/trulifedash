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


    .controller("HomeController", function ($scope,  $aside, $sce, DominoFactory, $timeout) {

        // data context

        $scope.dateAlertMessage = false;
        $scope.typeAlertMessage = false;
        $scope.spkLineOrder == true;
        $scope.spkLineHospital == false;
        $scope.spkLineOrthotist == false;

        $scope.loadKeywords = function () {
            DominoFactory.getKeywordData().then(function success(result) {
                $scope.kpi=result.data.kpi;
                $scope.keywordsHospitals = result.data.hospitals;
                $scope.keywordsOrderTypes = result.data.orderType;
                $scope.keywordsOrthotists = result.data.orthotists;
                $scope.keywordsReportMonths = result.data.reportMonths;
                $scope.cachedReports = result.data.cachedReports;
                for (var i = 0; i < result.data.cachedReports.length; i++) {
                    if (result.data.cachedReports[i].homepage == true) {
                        $scope.runHomePageCachedReport([i])
                    }
                }
            })
        }

        $scope.runCachedReport = function (i) {
            $scope.clearResult();
            DominoFactory.runCachedReport($scope.cachedReports[i].url).then(function success(result) {
                $scope.reportTitle = $scope.cachedReports[i].title;
                $scope.resultData = result.data;
            });
        }

        $scope.runHomePageCachedReport = function (i) {
            DominoFactory.runHomePageCachedReport($scope.cachedReports[i].url).then(function success(result) {
                $scope.reportTitle = $scope.cachedReports[i].title;
                if ($scope.cachedReports[i].reportType == 'ByOrder') {
                    $scope.listByOrderType = result.data.topData;
                } else if ($scope.cachedReports[i].reportType == 'ByHospital') {
                    $scope.listByHospital = result.data.topData;
                } else if ($scope.cachedReports[i].reportType == 'ByOrthotist') {
                    $scope.listByOrthotist = result.data.topData;
                }
                $scope.spkLineData = $scope.listByOrderType;
                $scope.spkLineOrder = true;
            });
        }

        $scope.spkLineToggle = function (i) {
            $scope.spkLineOrder = false;
            $scope.spkLineHospital = false;
            $scope.spkLineOrthotist = false;
            $scope.spkLineData = {};
            if (i == 0) {
                $scope.spkLineData = $scope.listByOrderType;
                $scope.spkLineOrder = true;
            } else if (i == 1) {
                $scope.spkLineData = $scope.listByHospital;
                $scope.spkLineHospital = true;

            } else if (i == 2) {
                $scope.spkLineData = $scope.listByOrthotist;
                $scope.spkLineOrthotist = true;
            }
        };

        $scope.clearResult = function () {
            $scope.resultData = "";
            $scope.formObj = {};
            $scope.setDefaults();
        }

        $scope.setDefaults = function () {
            $scope.formObj = {}
            $scope.formObj.Summary = "All";
            $scope.formObj.ReportType = "ByOrder";
            $scope.formObj.DateType = "Month";
        }

        $scope.setDefaults();
        $scope.loadKeywords();


        $scope.postQuery = function () {
            $scope.dateAlertMessage = false;
            if ($scope.formObj.StartDate && !$scope.formObj.EndDate) {
                $scope.dateAlertMessage = true;
                $timeout(function () {
                    $scope.dateAlertMessage = false;
                }, 3500);
                $scope.showFilterForm();
                return false;
            }
            if (!$scope.formObj.StartDate && $scope.formObj.EndDate) {
                $scope.dateAlertMessage = true;
                $timeout(function () {
                    $scope.dateAlertMessage = false;
                }, 3500);
                $scope.showFilterForm();
                return false;
            }
            if ($scope.formObj.AdditionalReportType == $scope.formObj.ReportType) {
                $scope.typeAlertMessage = true;
                $timeout(function () {
                    $scope.typeAlertMessage = false;
                }, 3500);
                $scope.showFilterForm();
                return false;
            }


            //Because we are dealing with Domino & CORS we cant use the REST API because of the limit of 3 headers in the website rules
            //So we have converted to the old fashioned POST method
            //One problem with this is multi value fields so we need to implode them
            if ($scope.formObj.OrderFilterList) {
                $scope.formObj.OrderFilterListImp = $scope.formObj.OrderFilterList.join("@")
            }

            if ($scope.formObj.TopLevelFilterList) {
                $scope.formObj.TopLevelFilterListImp = $scope.formObj.TopLevelFilterList.join("@")
            }
            if ($scope.formObj.AdditionalTopLevelFilterList) {
                $scope.formObj.AdditionalTopLevelFilterListImp = $scope.formObj.AdditionalTopLevelFilterList.join("@")
            }

            DominoFactory.postOptions($scope.formObj).then(function (success) {
                $scope.resultData = "";
                $scope.reportTitle = "";
                $scope.resultData = success.data;
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
