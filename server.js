'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require ('body-parser');
var hbs = require('express-handlebars');
var app = express();

//POSTING
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



var Primus = require('primus');
var mongoose = require('mongoose');
var Discussion = require('./models/Discussion.model.js');
var Question = require('./models/Question.model.js');
var Answer = require('./models/Answer.model.js');
var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(3005).sockets;


 mongoose.connect('mongodb://127.0.0.1/qanda');
/*app.get('/Discussions', function(req, res){
console.log('getting all discs');
Discussion.find({})
    .exec(function(err, discussions){
        if(err) {
            res.send('error has occured')
        } else {
            res.json(discussions);
        }
    });
}); */

// Connect to MongoDB

mongo.connect('mongodb://127.0.0.1/qanda', function(err, db) {
   if(err){
      throw err;
   }
   console.log('MongoDB connected...');

    // Connect Socket.io
    client.on('connection', function (socket) {
         var disc = db.collection('discussions');
        var quest = db.collection('questions');
        var answ = db.collection('answers');

         // Create function to send status
       var sendStatus = function(s){
           socket.emit('status', s);
        }


        // Get discs from mongo collection
        disc.find().limit(100).sort({_id:1}).toArray(function(err, res){
           if(err) {
              throw err;
           }
           // emit discs
            socket.emit('output', res);
        });

        // Get quests from mongo collection
        quest.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err) {
                throw err;
            }
            // emit discs
            socket.emit('outputq', res);
        });

        // Get answers from mongo collection
        answ.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err) {
                throw err;
            }
            // emit discs
            socket.emit('outputa', res);
        });




        //handle input events
        socket.on('input', function(data){
           var mod = data.mod;
           var name = data.name;
           var location = data.location;
         /*  var location = data.location;
           var question = data.question;
           var answer = data.answer; */

           //check for mod and name

               disc.insert({mod: mod, name: name, location: location}, function (){
                  client.emit('output', [data]);


               });

        });

        socket.on('inputq', function(data){
            var question = data.question;
            var discname = data.discname;
            /*  var location = data.location;
              var question = data.question;
              var answer = data.answer; */

            //check for mod and name

            quest.insert({question: question, discname: discname}, function (){
                client.emit('outputq', [data]);


            });

        });

        socket.on('inputa', function(data){
            var answer = data.answer;
            var discname = data.discname;
            var question = data.question;
            var user = data.user;

            /*  var location = data.location;
              var question = data.question;
              var answer = data.answer; */

            //check for mod and name

            answ.insert({answer: answer, discname: discname, question: question, user: user}, function (){
                client.emit('outputa', [data]);


            });

        });


        //handle clear
        socket.on('clear', function(){
           //remove all discs from collection
            disc.remove({}, function(){
               //emit cleared
                socket.emit('cleared');
            });
        });
    });
});



var index = require('./routes/index');
var discussions = require('./routes/discussion');
var users = require('./routes/user');
var questions = require('./routes/question');
var answers = require('./routes/answer');




var port = 3000;



app.use(express.static(path.join(__dirname, 'public')));
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({extname: 'hbs'}));

// Set Static Folder (ANGULAR)
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Route
app.use('/', index);
app.use('/discussion', discussions);
app.use('/user', users);
app.use('/question', questions);
app.use('/answer', answers);


app.listen(port, function() {
   console.log('Server started on port' +port);

});
