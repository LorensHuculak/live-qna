'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require ('body-parser');

var Primus = require('primus');

const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(3000).sockets;

// Connect to mongo
mongodb.connect('mongodb://127.0.0.1/qanda', function(err, db) {
   if(err){
      throw err;
   }
   console.log('MongoDB connected...')
});

var index = require('./routes/index');
var discussions = require('./routes/discussion');
var create = require('./routes/user');




var port = 3000;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder (ANGULAR)
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Route
app.use('/', index);
app.use('/discussion', discussions);
app.use('/user', users);

app.listen(port, function() {
   console.log('Server started on port' +port);

});
