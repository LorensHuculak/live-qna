var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var Answer = require('../models/Answer.model.js');


// Database Checker /answer
router.get('/', function (req, res, next) {
    console.log('Checking All Answers');
    Answer.find({})
        .exec(function(err, answers){
            if(err) {
                res.send('error has occured')
            } else {
                res.json(answers);
            }
        });
    
});

module.exports = router;