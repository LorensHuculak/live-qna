var express = require('express');
var path = require('path');
var bodyParser = require ('body-parser');

var index = require('./routes/index');
var discussions = require('./routes/discussion');
var port = 4200;

var app = express();

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

app.listen(port, function() {
   console.log('Server started on port' +port);

});
