/**
 * Created by StevenChapman on 10/02/15.
 */
app.directive('tfNavTabs', function($aside) {

    return {
        restrict: "E",
        templateUrl: '../common/directives/tfNavTabs.tpl.html',
        link: function link(scope, element, attrs)
        {

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
                console.log('i am in the scope');
                console.log(scope.selectedTypes);

            };

            scope.clearReportFilter = function () {
              scope.selectedTypes={};

            }
        }

    };

});