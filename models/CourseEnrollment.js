var mongoose = require('mongoose')

var CourseEnrollmentSchema = new mongoose.Schema({
  courseid: {
  	type: int,
  	required: true,
  	trim: true
  },
  userid: {
    type: String,
    required: true,
    trim: true
  },
}, {timestamps: true});


var CourseEnrollment = mongoose.model('CourseEnrollment', CourseEnrollmentSchema)
module.exports = CourseEnrollment