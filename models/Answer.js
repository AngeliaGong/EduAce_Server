var mongoose = require('mongoose')

var AnswerSchema = new mongoose.Schema({
  madeby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  content: {
  	type: String,
  	required: true
  },
}, {timestamps: true});


var Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer