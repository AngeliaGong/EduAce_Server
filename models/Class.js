var mongoose = require('mongoose')

var ClassSchema = new mongoose.Schema({ // 班级
  classname: {
    type: String,
    required: true,
    trim: true
  },
  teacher: { // 班主任
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  	required: true
  },
  announcements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement'
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
}, {timestamps: false});


var Class = mongoose.model('Class', ClassSchema)
module.exports = Class