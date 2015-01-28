/**
 * Created by Mark on 09/01/2015.
 */

var app = angular.module("queryApp",['wj']);

//home controller
app.controller("HomeController",function($scope,DataFactory) {

    $scope.loadData=function(){DataFactory.loadData().then(
        function success(result){
            var onTime=0;
            var total=0;
            for (var i = 0; i < result.data.length; i++) {
                 onTime+= result.data[i].OnTime;
                total+=result.data[i].Total;
            }
            // expose data as a CollectionView to get events
            $scope.listByOrderType = result.data.orderData;
            $scope.listAll = new wijmo.collections.CollectionView(result.data.orderData);

            //Calculate Percentage
              $scope.anythingSummaryOnTime=onTime/(total/100);


                        }
    )
    }


    $scope.loadData();
    })
