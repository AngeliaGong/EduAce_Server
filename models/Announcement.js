var mongoose = require('mongoose')

var AnnouncementSchema = new mongoose.Schema({ // 班级
  title: {
    type: String,
    required: true,
    trim: true
  }
  content: {
    type: String,
    required: true,
    trim: false
  },
  isPublic: {
    type: Boolean,
    default: true
  }
  madeby: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }
}, {timestamps: true});


var Announcement = mongoose.model('Announcement', AnnouncementSchema)
module.exports = Announcement