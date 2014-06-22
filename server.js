var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var express = require('express');
var app = express();
var teamRouter = require('./app/rests/team');


var morgan = require('morgan');
app.use(morgan('dev'));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.use('/api', teamRouter);

app.listen(port);
console.log('Server started on port '+ port);