var mongoose = require('mongoose')

var ClassSchema = new mongoose.Schema({ // 班级
  classid: {
  	type: int,
  	unique: true,
  	required: true,
  	trim: true
  },
  classname: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
  	type: int,
  	required: true
  },
  teacher: { // 班主任
  	type: String, //userid
  	required: true
  }
}, {timestamps: false});


var Class = mongoose.model('Class', ClassSchema)
module.exports = Class