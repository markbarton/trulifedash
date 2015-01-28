/**
 * Created by Mark on 27/10/2014.
 */

var express = require('express');
var app     = express();
var port    = 	process.env.PORT || 8001;
var http = require("http");
var cors=require('cors');
var config = require('./config');
var logger = require('./Logger')
var path = require('path');

// ROUTES
// ==============================================

// get an instance of router
var router = express.Router();

// apply the routes to our application
app.use(cors());
//require('./routes')(app);
// START THE SERVER
// ==============================================
app.listen(port);

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/trulife/dash', function(req, res) {
    res.render('dashboard/index.html');
});
app.get('/trulife/query', function(req, res) {
    res.render('query/queryBuilder.html');
});

logger.info('Trulife dash started');
console.log('Magic happens on port ' + port);