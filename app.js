const express = require('express')
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const Account = require('./models/Account')
const app = express()
const UserClassInit = require('./db_init/db_userClass_init')
// note: password is RBRMA5d7ekZ3dVR6
mongoose.connect('mongodb://gsq_projectteam:RBRMA5d7ekZ3dVR6@eduace-shard-00-00-qzaj2.mongodb.net:27017,eduace-shard-00-01-qzaj2.mongodb.net:27017,eduace-shard-00-02-qzaj2.mongodb.net:27017/test?ssl=true&replicaSet=EduAce-shard-0&authSource=admin');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

app.get('/', (req, res) =>
	res.send('This is the EduAce server.')
)

// register requires HTTP post request with json parameters 
// userid, password, type (student/teacher/admin), same as login
app.post('/api/register', (req, res) => {
	if (!(req.body.userid && req.body.password && req.body.type)) {
		return res.status(400).send('Missing parameters.')
	} else if (req.body.password.length < 7) {
		return res.status(400).send ('Password cannot be less than 7 characters.')
	} else if (req.body.userid.length < 3) {
		return res.status(400).send ('Username cannot be less than 3 characters.')
	}

	// create new user based on request body paramters
	var account = new Account({
		userid: req.body.userid,
		password: req.body.password,
		type: req.body.type
	})

	// save user to database
	account.save((err, account) => {
		if (err) {
			console.log(err)
			return res.status(401).send(err.message)
		} else if (!account) {
			console.log('Account is not saved successfully')
			return res.status(401).send('User is not saved successfully')
		} else {
			console.log(account.userid + ' registered successfully.')
			return res.status(200).send(account)
		}
	})
})

// login requires HTTP post request with json parameters 
// userid, password, type (student/teacher/admin)
app.post('/api/login', (req, res)=> { 
	// if any parameter is missing (undefined), return 400.
	if (!(req.body.userid && req.body.password && req.body.type)) {
		return res.status(400).send('Missing parameters. ')
	}

	// else, find user from databse and signin
	Account.findOne({
		type: req.body.type,
		userid: req.body.userid,
		password: req.body.password
	}, (err, account) => {
		if (err) {
			// unknown system or database error, including no such credentials. return 401
			console.log(err)
			return res.status(401).send(err.message)
		} else if (!account) {
			console.log('Wrong userid or password')
			return res.status(401).send('Wrong userid or password')
		} else {
			// return authentication token
			console.log(account.userid + ' logged in successfully')
			return jwt.sign({account}, 'secretkey', {expiresIn : '7d'}, (err, token) => {
				res.status(200).json({
					token
				})
			})
		}
	})
})

// a testing post request api that requires authentication token in the header
app.post('/api/authtest', verifyToken, (req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			return res.sendStatus(403).send(err)
		} else {
			return res.json({
				message: 'Authenticated',
				authData
			})
		}
	})
})


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// verify token 
function verifyToken(req,res,next) {
	// get auth header value
	const bearerHeader = req.headers['authorization']
	//check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// split at space
		const bearer = bearerHeader.split(' ')
		// get the token from the array
		const bearerToken = bearer[1]
		// set the token
		req.token = bearerToken
		// next middleware
		next()
	} else {
		// Forbidden
		return res.status(403).json({
			error: 'Unauthorized'
		})
	}

}

var port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log('Listening on port ' + port)
})