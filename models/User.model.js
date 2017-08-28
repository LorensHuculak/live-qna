var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String,
        index:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//Encrypt Password New User
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//GET User by Name
module.exports.getUserByUsername = function(name, callback){
    var query = {name: name};
    User.findOne(query, callback);
}

//Get User by Id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//Password Confirm
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}