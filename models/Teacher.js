var mongoose = require('mongoose')

var TeacherSchema = new mongoose.Schema({
  user: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  	unique: true,
  	required: true,
  },
  office: {
    type: String,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Class',
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course'
  }]
}, {timestamps: true});


var Teacher = mongoose.model('Teacher', TeacherSchema)
module.exports = Teacher