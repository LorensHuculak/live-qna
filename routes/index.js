var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {'location': 'Leuven'});
    
});

router.get('/create', function (req, res, next) {
    res.render('create');

});

module.exports = router;