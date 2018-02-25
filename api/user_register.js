/***********************************/
/* Creator: Gong                   */
/* Status: Ready for Testing       */
/* Time: Feb.7,2018                */
/***********************************/

// library
const jwt = require('jsonwebtoken')

// module functions
const VerifyToken = require('./VerifyToken')

// models
const Account = require('../models/Account')
const User = require('../models/User')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')

module.exports = (app) => {
	// register requires HTTP post request with json parameters 
	// userid, password, type (student/teacher/admin), same as login
	app.post('/api/register/student', VerifyToken, (req, res) => {
		// request body reinforcement
		if (!(req.body.userid && req.body.password && req.body.grade)) {
			return res.status(400).send('Missing parameters.')
		} else if (req.body.password.length < 7) {
			return res.status(400).send ('Password cannot be less than 7 characters.')
		} else if (req.body.userid.length < 3) {
			return res.status(400).send ('Username cannot be less than 3 characters.')
		} else if (req.body.grade < 0 || req.body.grade > 12) {
			return res.status(400).send ('Grade must be between 1 and 12')
		}

		// check if user is logged in as admin
		var adminAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.type != 'admin') {
	    		return res.status(401).send('Unauthorized action. Pleas login as admin.')
		    } else {
		    	adminAccount = account
		    }
	    })

		// create new account based on request body paramters
		var account = new Account({
			userid: req.body.userid,
			password: req.body.password,
			type: 'student'
		})

		// save student to database
		account.save((err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Account is not saved successfully')
				return res.status(401).send('Account is not saved successfully')
			} else {
				console.log(account.userid + ' student account created successfully.')

				var user;
				if (req.body.username) {
					user = new User({
						account: account._id,
						username: req.body.username
					})
				} else {
					user = new User({
						account: account._id,
						username: req.body.userid
					})
				}
				

				user.save((err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else {
						console.log ('student user created successfully.')

						var student = new Student({
							user: user._id, 
							grade: req.body.grade,
							courses: []
						})

						student.save((err, student) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else {
								console.log ('Student created successfully.')

								return jwt.sign({adminAccount}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({student, user, account, token})
								})
							}
						})
					}
				})
			}
		})
	})

	app.post('/api/register/teacher', VerifyToken, (req, res) => {
		// request body reinforcement
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		} else if (req.body.password.length < 7) {
			return res.status(400).send ('Password cannot be less than 7 characters.')
		} else if (req.body.userid.length < 3) {
			return res.status(400).send ('Username cannot be less than 3 characters.')
		} 

		// check if user is logged in as admin
		var adminAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.type != 'admin') {
	    		return res.status(401).send('Unauthorized action. Pleas login as admin.')
		    } else {
		    	adminAccount = account
		    }
	    })

		// create new account based on request body paramters
		var account = new Account({
			userid: req.body.userid,
			password: req.body.password,
			type: 'teacher'
		})

		// save teacher to database
		account.save((err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Account is not saved successfully')
				return res.status(401).send('User is not saved successfully')
			} else {
				console.log(account.userid + 'Teacher account created successfully.')

				var user = new User({
					account: account._id,
					username: 'name of ' + req.body.userid
				})

				user.save((err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else {
						console.log ('Teacher user created successfully.')

						var teacher = new Teacher({
							user: user._id, 
							courses: []
						})

						teacher.save((err, teacher) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else {
								console.log ('Teacher created successfully.')
								return jwt.sign({adminAccount}, 'secretkey', {expiresIn: '3d'}, 
									(err,token) => {
									res.status(200).json({teacher, user, account, token})
								})
							}
						})
					}
				})
			}
		})
	})

	// Even registering admin requires one to be logged in as admin.
	// Use the following admin credentials to register other users: 
	// userid: authtest
	// password: test123
	app.post('/api/register/admin', VerifyToken, (req, res) => {
		// request body reinforcement
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		} else if (req.body.password.length < 7) {
			return res.status(400).send ('Password cannot be less than 7 characters.')
		} else if (req.body.userid.length < 3) {
			return res.status(400).send ('Username cannot be less than 3 characters.')
		} 
	
		// check if user is logged in as admin
		var adminAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.type != 'admin') {
	    		return res.status(401).send('Unauthorized action. Pleas login as admin.')
		    } else {
		    	adminAccount = account
		    }
	    })

		// create new account based on request body paramters
		var account = new Account({
			userid: req.body.userid,
			password: req.body.password,
			type: 'admin'
		})

		// save admin to database
		account.save((err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Account is not saved successfully')
				return res.status(401).send('User is not saved successfully')
			} else {
				console.log(account.userid + ' admin account created successfully.')

				var user = new User({
					account: account._id,
					username: 'name of ' + req.body.userid
				})

				user.save((err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else {
						console.log ('admin user created successfully.')

						var admin = new Admin({
							user: user._id, 
						})

						admin.save((err, admin) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else {
								console.log ('Admin created successfully.')
								return jwt.sign({adminAccount}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({admin, user, account, token})
								})
							}
						})
					}
				})
			}
		})
	})
}