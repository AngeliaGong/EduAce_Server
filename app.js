// requirments
const express = require('express')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
// const UserClassInit = require('./db_init/db_userClass_init')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongodb connection
mongoose.connect('mongodb://gsq_projectteam:RBRMA5d7ekZ3dVR6@eduace-shard-00-00-qzaj2.mongodb.net:27017,eduace-shard-00-01-qzaj2.mongodb.net:27017,eduace-shard-00-02-qzaj2.mongodb.net:27017/test?ssl=true&replicaSet=EduAce-shard-0&authSource=admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// API endpoints
require('./api/root')(app);
require('./api/authtest')(app);

// user APIs
require('./api/user_register')(app);
require('./api/user_login')(app);
require('./api/user_remove')(app);
require('./api/user_profile')(app);
require('./api/user_update')(app);
require('./api/user_changePassword')(app);


// listen to port
var port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log('Listening on port ' + port)
	//UserClassInit()
})
