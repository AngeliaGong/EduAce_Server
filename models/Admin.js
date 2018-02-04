var mongoose = require('mongoose')

var AdminSchema = new mongoose.Schema({
}, {timestamps: true});


var Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin