'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    answer: {
        type: String,
    },
    discname: String,
    question: String,
    user: String,
    qid: String

});

module.exports = mongoose.model('Answer', AnswerSchema);