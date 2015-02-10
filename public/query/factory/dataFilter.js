var app = angular.module("queryApp");
app.factory('DataFilter', function DataFilter($http) {


    var filteredData = {  //build this object however you want
        add: function (data) {
            if (data.reportType == 'consultant') {
                var u = 'allothordist.json';
            } else if (data.reportType == 'type') {
                var u = 'alltype.json';
            } else if (data.reportType == 'hospital') {
                var u = 'allhospital.json';
            } else {
                //not sure yet
            }
            console.log(u)
            return $http({
                method: 'GET',
                url: '../query/data/'+u
            });
        }
    };

    return filteredData; //return the object
})