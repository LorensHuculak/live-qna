var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/qanda');
var db = mongoose.connect;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.model.js');


router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('index', {username: req.user.name});
    
});

router.get('/create', ensureAuthenticated, function (req, res, next) {
    res.render('create', {username: req.user.name});

});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/user/login');
    }
}
module.exports = router;