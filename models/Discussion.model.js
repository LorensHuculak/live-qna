'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mod: String,
    location: String,
    question: {
        type: String,
        qowner: String,
        qcontent: String
    },
    answer: {
        type: String,
        aowner: String,
        acontent: String
    }
});

module.exports = mongoose.model('Discussion', DiscSchema);