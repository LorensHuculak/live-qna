var express = require('express');
var router = express.Router();

router.get('/register', function (req, res, next) {
    res.render('register.html');
    
});

router.get('/', function (req, res, next) {
    res.render('login.html');

});

module.exports = router;