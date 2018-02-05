const Account = require('../models/Account')
const User = require('../models/User')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')

module.exports = (app) => {
	// register requires HTTP post request with json parameters 
	// userid, password, type (student/teacher/admin), same as login
	app.post('/api/register/student', (req, res) => {
		// requirement reinforcement
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		} else if (req.body.password.length < 7) {
			return res.status(400).send ('Password cannot be less than 7 characters.')
		} else if (req.body.userid.length < 3) {
			return res.status(400).send ('Username cannot be less than 3 characters.')
		} 

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
				return res.status(401).send('User is not saved successfully')
			} else {
				console.log(account.userid + ' student account created successfully.')

				var user = new User({
					account: account._id,
					username: 'name of ' + req.body.userid
				})

				user.save((err, new_user) => {
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

						student.save((err, new_student) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else {
								console.log ('Student created successfully.')
								return res.status(200).send(account)
							}
						})
					}
				})
			}
		})
	})

	app.post('/api/register/teacher', (req, res) => {
		// requirement reinforcement
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		} else if (req.body.password.length < 7) {
			return res.status(400).send ('Password cannot be less than 7 characters.')
		} else if (req.body.userid.length < 3) {
			return res.status(400).send ('Username cannot be less than 3 characters.')
		} 

		// create new account based on request body paramters
		var account = new Account({
			userid: req.body.userid,
			password: req.body.password,
			type: 'teacher'
		})

		// save student to database
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

				user.save((err, new_user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else {
						console.log ('Teacher user created successfully.')

						var teacher = new Teacher({
							user: user._id, 
							courses: []
						})

						teacher.save((err, new_student) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else {
								console.log ('Teacher created successfully.')
								return res.status(200).send(account)
							}
						})
					}
				})
			}
		})
	})

	app.post('/api/register/admin', (req, res) => {
		// requirement reinforcement
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		} else if (req.body.password.length < 7) {
			return res.status(400).send ('Password cannot be less than 7 characters.')
		} else if (req.body.userid.length < 3) {
			return res.status(400).send ('Username cannot be less than 3 characters.')
		} 

		// create new account based on request body paramters
		var account = new Account({
			userid: req.body.userid,
			password: req.body.password,
			type: 'admin'
		})

		// save student to database
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

				user.save((err, new_user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else {
						console.log ('admin user created successfully.')

						var admin = new Admin({
							user: user._id, 
						})

						admin.save((err, new_student) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else {
								console.log ('Student created successfully.')
								return res.status(200).send(account)
							}
						})
					}
				})
			}
		})
	})
}