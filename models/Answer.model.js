'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    answer: {
        type: String,
        required: true,
        unique: true
    },
    discname: String,
    question: String,
    user: String

});

module.exports = mongoose.model('Answer', AnswerSchema);