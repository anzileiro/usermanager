var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/config.js');
var routes = require('./routes/routes.js');

var app = express();

mongoose.connect(config.connection_string);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    
    extended: false
    
}));

app.use('/api', routes);

module.exports = app;