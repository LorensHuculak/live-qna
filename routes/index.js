var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/qanda');
var db = mongoose.connect;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.model.js');

// Index Page
router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('index', {username: req.user.name});
});

// Create Page
router.get('/create', ensureAuthenticated, function (req, res, next) {
    res.render('create', {username: req.user.name});
});

// Authenticate User + Redirect
function ensureAuthenticated(req, res, next){

    if(req.isAuthenticated()){
        return next();

    } else {
        // req.flash('success_msg','Please login');
        res.redirect('/user/login');
    }
}
module.exports = router;