var mongoose = require('mongoose')

var StudentSchema = new mongoose.Schema({
  user: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  	unique: true,
  	required: true,
  },
  grade: { // not used for now
    type: Number,
    required:true
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


var Student = mongoose.model('Student', StudentSchema)
module.exports = Student