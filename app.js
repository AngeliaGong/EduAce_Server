const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User')
const init = require('./db_init')
const app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://gsq_projectteam:RBRMA5d7ekZ3dVR6@eduace-shard-00-00-qzaj2.mongodb.net:27017,eduace-shard-00-01-qzaj2.mongodb.net:27017,eduace-shard-00-02-qzaj2.mongodb.net:27017/test?ssl=true&replicaSet=EduAce-shard-0&authSource=admin');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

app.get('/', (req, res) => 
	res.send('This is the EduAce server.')
)

app.post('/login', (req, res)=> { 
	if (!(req.body.username && req.body.password && req.body.type)) {
		return res.status(400).send('Missing parameters.')
	}

	User.findOne({
		type: req.body.type,
		username: req.body.username,
		password: req.body.password
	}, (err, user) => {
		if (err) {
			console.log(err)
			return res.status(401).send(err.message)
		} else if (!user) {
			console.log('Wrong username or password')
			return res.status(401).send('Wrong username or password')
		} else {
			console.log(user.username + ' logged in successfully')
			return res.status(200).send(user)
		}
	})
})

app.post('/register', (req, res) => {
	if (!(req.body.username && req.body.password && req.body.type)) {
		return res.status(400).send('Missing parameters.')
	} else if (req.body.password.length < 7) {
		return res.status(400).send ('Password cannot be less than 7 characters.')
	} else if (req.body.username.length < 3) {
		return res.status(400).send ('Username cannot be less than 3 characters.')
	}

	var user = new User({
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	})

	user.save((err, user) => {
		if (err) {
			console.log(err)
			return res.status(401).send(err.message)
		} else if (!user) {
			console.log('User is not saved successfully')
			return res.status(401).send('User is not saved successfully')
		} else {
			console.log(user.username + ' registered successfully.')
			return res.status(200).send(user)
		}
	})
})

var port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log('Listening on port ' + port)
})