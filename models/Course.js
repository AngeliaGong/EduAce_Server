var mongoose = require('mongoose')

var CourseSchema = new mongoose.Schema({ // 班级
  coursename: {
    type: String,
    required: true,
    trim: true
  },
  teacher: { // 班主任
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  schedule: [{
    day: {
      type: Number,
      reuired: true,
      min: 1,
      max: 7,
    },
    startHour: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    startMinute: {
      type: Number,
      default: 0,
      min: 0,
      max: 59
    },
    endHour: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    endtMinute: {
      type: Number,
      default: 0,
      min: 0,
      max: 59
    },
  }],
  announcements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement'
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
}, {timestamps: false});


var Course = mongoose.model('Course', CourseSchema)
module.exports = Course
