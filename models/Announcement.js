var mongoose = require('mongoose')

var AnnouncementSchema = new mongoose.Schema({ // 班级
  announcementid: {
  	type: Number,
  	unique: true,
  	required: true,
  	trim: true
  },
  content: {
    type: String,
    required: true,
    trim: false
  },
  announcementType: {
    type: Number // 0: regular announcement, 1: homework
  }
  madeby: {
  	type: String, //teacher's userid
  	required: true
  },
  Scope: {
    type: Number // 0:class, 1:course, 2:grade, 3:all
    required: true
  },
  Scopeid: {
    type: Number //class id, course id, grade number, or NULL
  }
}, {timestamps: true});


var Class = mongoose.model('Class', ClassSchema)
module.exports = Class