var mongoose = require('mongoose')

var AccountSchema = new mongoose.Schema({
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


var Account = mongoose.model('Account', AccountSchema)
module.exports = Account