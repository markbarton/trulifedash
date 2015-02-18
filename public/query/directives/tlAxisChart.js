/**
 * Created by StevenChapman on 10/02/15.
 */
app.directive('tlAxisChart', function ($sce) {

    return {
        restrict: "E",
        scope: {
            results: '=results'
        },
        templateUrl: '../query/directives/tlAxisChart.tpl.html',
        link: function link(scope, element, attrs) {

            scope.createChart = function (data) {
                console.log(data);
                return $sce.trustAsHtml('<div>'+data+'</div>');
            };


        }

    };

});