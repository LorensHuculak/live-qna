'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    mod: String,
    location: String,
    question: String,
    answer: String

});

module.exports = mongoose.model('Discussion', DiscSchema);