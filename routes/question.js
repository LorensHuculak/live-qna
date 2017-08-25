var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var Question = require('../models/Question.model.js');

router.get('/', function(req, res){
    console.log('getting all questions');
    Question.find({})
        .exec(function(err, questions){
            if(err) {
                res.send('error has occured')
            } else {
                res.json(questions);
            }
        });
});

router.get('/create', function (req, res, next) {
    res.render('create');

});

module.exports = router;