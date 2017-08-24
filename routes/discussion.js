var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://lorens:root@ds157233.mlab.com:57233/liveqa_lorens',['discussions']);
// Get All Discussions
router.get('/', function (req, res, next) {
    db.discussions.find(function(err, discussions){
        if(err) {
            res.send(err);
        }
        res.json(discussions);
    });

});

// Get Single Discussion
router.get('/:id', function (req, res, next) {
    db.discussions.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, discussion){
        if(err) {
            res.send(err);
        }
        res.json(discussion);
    });

});

router.get('/create', function (req, res, next) {
    res.render('create.html');

});





module.exports = router;