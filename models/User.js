var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  userid: {
  	type: String,
  	unique: true,
  	required: true,
  	trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  type: { // teacher, student, or administrator
  	type: String,
  	required: true
  },
  homeclass: { // 所在班级
    type: Number, //classid
    required: true,
    trim: true
  },
}, {timestamps: true});


var User = mongoose.model('User', UserSchema)
module.exports = User