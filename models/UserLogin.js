var mongoose = require('mongoose')

var UserLoginSchema = new mongoose.Schema({
  userid: {
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


var UserLogin = mongoose.model('UserLogin', UserLoginSchema)
module.exports = UserLogin