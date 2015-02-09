# trulifedash

The following are the POST parameters to filter the report:

A report can either be by Order Type, by Hospital (& then by Order Type) or by Orthotist (& then by Order Type)
A report can either by the last 30 days (& therefore broekn down by days) or grouped by months (& years)
If grouped by months then a Start Date (Year - Month) and / or a End Date (Year - Month) can be specified
The Order Type(s) can be defined regardless of the type of report
The Hospital(s) can be defined
The Orthotist(s) can be defined

Due to the way AngularJS posts data and the Domino REST API the approach will be to use a standard $http POST to the Domino REST API - this will return a UNID as part of the return from Domino - this UNID will then be passed to the reporting agent as part of the query string which will trigger the report.

A default will be selected if the value is missing / blank

<table>
<thead>
<tr><th>Property</th><th>Description</th><th>Possible Values</th></tr>
</thead>
<tr><td>ReportType</td><td>What tpye of Report</td><td><ul><li>ByOrder(default)</li><li>ByOrthotist</li><li>ByHospital</li></ul> </td></tr>
<tr><td>DateType</td><td>Either grouped by Month or last 30 Days</td><td><ul><li>Month (Default)</li><li>30Days</li></ul></td></tr>
</table>
