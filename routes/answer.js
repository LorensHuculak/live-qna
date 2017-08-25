var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var Answer = require('../models/Answer.model.js');

router.get('/', function (req, res, next) {
    console.log('getting all answers');
    Answer.find({})
        .exec(function(err, answers){
            if(err) {
                res.send('error has occured')
            } else {
                res.json(answers);
            }
        });
    
});

router.get('/create', function (req, res, next) {
    res.render('create');

});

module.exports = router;