var express = require('express');
var router = express.Router();


router.get('/login', function (req, res, next) {

    res.render('login.html');

});

router.get('/register', function (req, res, next) {
    res.render('register.html');
    
});



module.exports = router;