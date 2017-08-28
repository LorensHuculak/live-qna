var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var Question = require('../models/Question.model.js');

// Checking Questions
router.get('/', function(req, res){

    console.log('Checking all Questions');

    Question.find({})
        .exec(function(err, questions){
            if(err) {
                res.send('error has occured')
            } else {
                res.json(questions);
            }
        });
});

module.exports = router;