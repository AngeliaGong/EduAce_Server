var mongoose = require('mongoose')

var CourseSchema = new mongoose.Schema({ // 班级
  courseid: {
    type: int,
    unique: true,
    required: true,
    trim: true
  },
  coursename: {
    type: String,
    required: true,
    trim: true
  },
  teacher: { // 班主任
    type: String, //userid
    required: true
  },
  startTime: {
    type: Date // only interested in time
    required: false // for now.. useful if adding a schedule table feature.
  },
  endTime: {
    type: Date //only interested in time
    required: false // for now.. useful if adding a schedule table feature.
  }
}, {timestamps: false});


var Course = mongoose.model('Course', CourseSchema)
module.exports = Course