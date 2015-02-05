/**
 * Created by Mark on 09/01/2015.
 */

var app = angular.module("queryApp",['wj','ngSanitize', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside']);

//home controller
app.controller("HomeController",function($scope,DataFactory,$aside, $sce) {
// Pre-fetch an external template populated with a custom scope
    var myAside = $aside({scope: $scope, template: '../query/filterForm.tpl.html', title: "Filtering form", content: "Please", show: false});

    $scope.showFilterForm = function(){
        $aside({scope: $scope, template: '../query/filterForm.tpl.html', title: "Filtering form",  show: true, animation: "am-fade"});
    };

    $scope.showMenu = function(){
         $aside({scope: $scope, template: '../common/menu.tpl.html', title: "Menu", content: "", show: true, placement: "left"});
    };

    $scope.applyReportFilter = function(){
        console.log('i am in hte scope');
    }

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
            console.log($scope.listAll)

            //Calculate Percentage
              $scope.anythingSummaryOnTime=onTime/(total/100);

                        }
    )
    }
    $scope.getSparklines = function (data, width, height) {
        var rtn = new Array();
        for (var i = 0; i < data.length; i++) {
            rtn.push(data[i].total);
        }

        // create line elements
        var min = Math.min.apply(Math, rtn),
            max = Math.max.apply(Math, rtn),
            x1 = 0,
            y1 = scaleY(rtn[0], min, max),
            x2, y2;
        for (var i = 1; i < rtn.length; i++) {
            x2 = Math.round((i) / (rtn.length - 1) * 100);
            y2 = scaleY(rtn[i], min, max);
            svg += '<line x1=' + x1 + '% y1=' + y1 + '% x2=' + x2 + '% y2=' + y2 + '% />';
            x1 = x2;
            y1 = y2;
        }

        // wrap it up in an SVG element
        var svg = encloseSvg(svg, width, height);

        // and ensure this is trusted HTML
        return $sce.trustAsHtml(svg);
    }
    function scaleY(value, min, max) {
        return 100 - Math.round((value - min) / (max - min) * 100);
    }
    function encloseSvg(svg, width, height) {
        if (!height) height = '100%';
        if (!width) width = '100%';
        return '<div style="width:' + width + ';height:' + height + ';box-sizing:border-box;padding:4px">' +
            '<svg width="100%" height="100%" style="stroke:currentColor;stroke-width:2;opacity:.6;overflow:visible;color: #00b0f0"><g>' +
            svg +
            '</g></svg></div>';
    };



    $scope.loadData();
    })





