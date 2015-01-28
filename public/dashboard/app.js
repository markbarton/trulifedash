/**
 * Created by Mark on 09/01/2015.
 */

var app = angular.module("dashApp",['wj']);

//home controller
app.controller("HomeController",function($scope,DataFactory) {

    $scope.loadAnything=function(){DataFactory.loadAnything().then(
        function success(result){
            var onTime=0;
            var total=0;
            for (var i = 0; i < result.data.length; i++) {
                 onTime+= result.data[i].OnTime;
total+=result.data[i].Total;
            }
            // expose data as a CollectionView to get events
            $scope.data = new wijmo.collections.CollectionView(result.data);
            //Calculate Percentage
              $scope.anythingSummaryOnTime=onTime/(total/100);
                        }
    )
    }
    $scope.anythingSummaryTotal=100;
    $scope.anythingSummaryOnTime=0;

    $scope.loadBagTruss=function(){DataFactory.loadBagTruss().then(
        function success(result){
            var onTime=0;
            var total=0;
            // expose data as a CollectionView to get events
            $scope.bagdata = new wijmo.collections.CollectionView(result.data);
            for (var i = 0; i < result.data.length; i++) {
                onTime+= result.data[i].OnTime;
                total+=result.data[i].Total;
            }
            $scope.bagSummaryOnTime=onTime/(total/100);
        }
    )
    }
    $scope.loadBelowKnee=function(){DataFactory.loadBelowKnee().then(
        function success(result){
            var onTime=0;
            var total=0;
            // expose data as a CollectionView to get events
            $scope.belowKneeData = new wijmo.collections.CollectionView(result.data);
            for (var i = 0; i < result.data.length; i++) {
                onTime+= result.data[i].OnTime;
                total+=result.data[i].Total;
            }
            $scope.belowKneeSummaryOnTime=onTime/(total/100);
        }
    )
    }
    $scope.loadBeltCorset=function() {
        DataFactory.loadBeltCorset().then(
            function success(result) {
                var onTime = 0;
                var total = 0;
                // expose data as a CollectionView to get events
                $scope.beltCorsetData = new wijmo.collections.CollectionView(result.data);
                for (var i = 0; i < result.data.length; i++) {
                    onTime += result.data[i].OnTime;
                    total += result.data[i].Total;
                }
                $scope.beltCorsetSummaryOnTime = onTime / (total / 100);
            }
        )

    }
    $scope.test = 'tets';
    $scope.loadAnything();
    $scope.loadBagTruss();
    $scope.loadBelowKnee();
    $scope.loadBeltCorset();
    })
