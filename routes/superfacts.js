/**
 * Created by Mark on 28/10/2014.
 * This routing file is for calls to Superfacts
 */
var ctrl = require('../controllers/superfacts');
module.exports=function(app){
    app.get('/api/superfacts/:booking/:name',ctrl.getBooking);
    app.get('/api/superfacts/:booking',ctrl.getBookingSummary);

}