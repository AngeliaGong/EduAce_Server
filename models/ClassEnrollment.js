var mongoose = require('mongoose')

var ClassEnrollmentSchema = new mongoose.Schema({ // 班级
  classid: {
    type: Number,
    required: true,
    trim: true
  },
  userid: {
    type: String,
    required: true,
    trim: true
  },
}, {timestamps: true});


var ClassEnrollment = mongoose.model('ClassEnrollment', ClassEnrollmentSchema)
module.exports = ClassEnrollment