/**
 * Created by Mark on 04/01/2015.
 */


var winston = require('winston'),
    Papertrail = require('winston-papertrail').Papertrail;

var logger,
    consoleLogger = new winston.transports.Console({
        level: 'debug',
        timestamp: function() {
            return new Date().toString();
        },
        colorize: true
    })


var logger = new winston.Logger({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    transports: [
        consoleLogger
    ]
});

module.exports = logger;