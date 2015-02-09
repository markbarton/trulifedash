# trulifedash

The following are the POST parameters to filter the report:

A report can either be by Order Type, by Hospital (& then by Order Type) or by Orthotist (& then by Order Type)
A report can either by the last 30 days (& therefore broekn down by days) or grouped by months (& years)
If grouped by months then a Start Date (Year - Month) and / or a End Date (Year - Month) can be specified
The Order Type(s) can be defined regardless of the type of report
The Hospital(s) can be defined
The Orthotist(s) can be defined

Due to the way AngularJS posts data and the Domino REST API the approach will be to use a standard $http POST to the Domino REST API - this will return a UNID as part of the return from Domino - this UNID will then be passed to the reporting agent as part of the query string which will trigger the report.

A feature in progress will be cached reports - these will be created by a scheduled agent and the resultant JSON data will be stored in a Rich Text Field which will then be available for fast loading.

A default will be selected if the value is missing / blank

<table>
<thead>
<tr><th>Property</th><th>Description</th><th>Possible Values</th></tr>
</thead>
<tr><td>ReportType</td><td>What type of Report</td><td><ul><li>ByOrder(default)</li><li>ByOrthotist</li><li>ByHospital</li></ul> </td></tr>
<tr><td>DateType</td><td>Either grouped by Month or last 30 Days</td><td><ul><li>Month (Default)</li><li>30Days</li></ul></td></tr>
<tr><td>OrderFilterList</td><td>Imploded list of Order Types - implode with @</td><td>If left blank all order types returned</td></tr>
<tr><td>HospitalFilterList</td><td>Imploded list of Hospitals - implode with @ - only applicable for By Hospital Report Type</td><td>If left blank all Hospitals returned</td></tr>
<tr><td>OrthotistFilterList</td><td>Imploded list of Orthotists - implode with @ - only applicable for By Orthotist Report Type</td><td>If left blank all Orthotists returned</td></tr>
<tr><td>StartDate</td><td>Month - Year String - taken from inital keyword data e.g. OCT - 2011</td><td>If left blank earliest date used</td></tr>
<tr><td>EndDate</td><td>Month - Year String - taken from inital keyword data e.g. OCT - 2011</td><td>If left blank last date used</td></tr>
<tr><td>ReportTitle</td><td>Only used if save is set to true - this will give the saved data a title</td><td>If left blank generic title used</td></tr>
<tr><td>Save</td><td>If set to true then the JSON data will be saved along with the title</td><td>true = Save data.  Anything else is ignored</td></tr>
</table>
