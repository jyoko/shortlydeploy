var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var userSchema = db.Schema({
  username: String,
  password: String,
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password,null,null,function(err,hash) {
    this.password = hash;
    next();
  }.bind(this));
});

userSchema.methods.comparePassword = function(attempt, callback) {
  bcrypt.compare(attempt,this.password, function(err,isMatch) {
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function(cb) {
  bcrypt.hash(this.password,null,null,cb);
};

var User = db.model('users',userSchema);

        // user.increments('id').primary();
        // user.string('username', 100).unique();
        // user.string('password', 100);
        // user.timestamps();


/*
var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});
*/

module.exports = User;
