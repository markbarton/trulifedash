/**
 * Created by StevenChapman on 10/02/15.
 */
app.directive('tlSparkLines', function ($sce) {

    return {
        restrict: "E",
        scope: {
            listByOrderType: '=listByOrderType'
        },
        templateUrl: '../query/directives/tlSparkLines.tpl.html',
        link: function link(scope, element, attrs) {

            scope.getSparklines = function (data, width, height) {
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
                    if (isNaN(y2) == true) {
                        y2 = 0;
                        y1 = 0;
                    }
                    svg += '<line x1=' + x1 + '% y1=' + y1 + '% x2=' + x2 + '% y2=' + y2 + '% />';

                    x1 = x2;
                    y1 = y2;
                }

                // wrap it up in an SVG element
                var svg = encloseSvg(svg, width, height);

                // and ensure this is trusted HTML
                return $sce.trustAsHtml(svg);
            };

            function scaleY(value, min, max) {
                return 100 - Math.round((value - min) / (max - min) * 100);
            };

            function encloseSvg(svg, width, height) {
                if (!height) height = '100%';
                if (!width) width = '100%';
                return '<div style="width:' + width + ';height:' + height + ';box-sizing:border-box;padding:4px">' +
                    '<svg width="100%" height="100%" style="stroke:currentColor;stroke-width:2;opacity:.6;overflow:visible;color: #00b0f0"><g>' +
                    svg +
                    '</g></svg></div>';
            };
        }

    };

});