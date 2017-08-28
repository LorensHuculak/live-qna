var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.model.js');
mongoose.connect('mongodb://127.0.0.1/qanda');
var db = mongoose.connect;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Register User
router.get('/register', function (req, res) {

    res.render('register');

});

//Login User
router.get('/login', function (req, res) {

    res.render('login');

});

// Register POST
router.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

// Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){

        res.render('register',{
            errors:errors
        });

    } else {
        // Register User in Database
        var newUser = new User({
            name: name,
            email:email,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/user/login');
    }
});

// GET Username, MATCH Credentials, VALIDATE password
passport.use(new LocalStrategy(
    function(name, password, done) {
        User.getUserByUsername(name, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Invalid Username'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

// Login POST
router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/user/login',failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

//Logout User
router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/user/login');
});


module.exports = router;