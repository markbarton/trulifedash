/**
 * Created by StevenChapman on 10/02/15.
 */
app.directive('tfNavTabs', function ($aside, DataFilter) {

    return {
        restrict: "E",
        templateUrl: '../common/directives/tfNavTabs.tpl.html',
        link: function link(scope, element, attrs) {

            scope.showFilterForm = function () {
                $aside({
                    scope: scope,
                    template: '../query/filterForm.tpl.html',
                    title: "Filtering form",
                    show: true,
                    animation: "am-fade"
                });
            };

            scope.showMenu = function () {
                $aside({
                    scope: scope,
                    template: '../common/menu.tpl.html',
                    title: "Menu",
                    content: "",
                    show: true,
                    placement: "left"
                });
            };

            scope.applyReportFilter = function () {
                DataFilter.add(scope.selectedTypes).then(function success(result){
                    scope.resultData={};
                   console.log('success')
                   console.log(result.data)
                    scope.resultData=result.data;
                });

            };

            scope.clearReportFilter = function () {
                scope.selectedTypes = {};

            }
        }

    };

});