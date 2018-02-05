var mongoose = require('mongoose')

var AdminSchema = new mongoose.Schema({
  user: {
  	type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  	unique: true,
  	required: true,
  }
}, {timestamps: true});

var Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin