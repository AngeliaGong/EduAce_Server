var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  account: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  	unique: true,
  	required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: { // not used for now
    type: String,
    trim: true
  }
}, {timestamps: true});


var User = mongoose.model('User', UserSchema)
module.exports = User