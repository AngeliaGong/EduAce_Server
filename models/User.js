var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  username: {
  	type: String,
  	unique: true,
  	required: true,
  	trim: true
  },
  password: {
  	type: String,
  	required: true
  },
  type: {
  	type: String,
  	required: true
  }
}, {timestamps: true});


var User = mongoose.model('User', UserSchema)
module.exports = User