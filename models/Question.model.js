'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestSchema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    discname: String

});

module.exports = mongoose.model('Question', QuestSchema);