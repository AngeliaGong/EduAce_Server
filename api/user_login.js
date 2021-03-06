/***********************************/
/* Creator: Gong                   */
/* Status: Finished                */
/* Time: Feb.7,2018                */
/***********************************/

// library
const jwt = require('jsonwebtoken')

// models
const Account = require('../models/Account')
const User = require('../models/User')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')

module.exports = (app) => {
	app.post('/api/login/student', (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		}

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
			password: req.body.password,
			type: 'student'
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Cannot find account.')
				return res.status(404).send('Cannot find account.')
			} else {
				// Found the account!!!
				// now find the user who has this account
				User.findOne({
					account: account._id
				}, (err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!user) {
						console.log('Cannot find user.')
						return res.status(404).send('Cannot find user.')
					} else {
						// Found the user!!!
						// now find the student who is this user
						Student.findOne({
							user: user._id
						}, (err, student) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!student) {
								console.log('Cannot find student.')
								return res.status(404).send('Cannot find student.')
							} else {
								// Found it!!!
								console.log(account.userid + ' logged in successfully')
								// return auth token in response
								return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({
										id: account.id,
										password: account.password,
										name: user.username,
										contactInfo: user.contactInfo,
										grade: student.grade,
										class_id: student.class,
										courses: student.courses,
										student_model_id: student._id,
										user_model_id: user._id,
										account_model_id: account._id,
										token
									})
								})
							}
						})
					}
				})
			}

		})

	})


	app.post('/api/login/teacher', (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		}

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
			password: req.body.password,
			type: 'teacher'
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Cannot find account.')
				return res.status(404).send('Cannot find account.')
			} else {
				// Found the account!!!
				// now find the user who has this account
				User.findOne({
					account: account._id
				}, (err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!user) {
						console.log('Cannot find user.')
						return res.status(404).send('Cannot find user.')
					} else {
						// Found the user!!!
						// now find the teacher who is this user
						Teacher.findOne({
							user: user._id
						}, (err, teacher) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!teacher) {
								console.log('Cannot find teacher.')
								return res.status(404).send('Cannot find teacher.')
							} else {
								// Found it!!!
								console.log(account.userid + ' logged in successfully')
								// return auth token in response
								return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({
										id: account.id,
										password: account.password,
										name: user.username,
										contactInfo: user.contactInfo,
										office: teacher.office,
										class_id: teacher.class,
										courses: teacher.courses,
										teacher: teacher._id,
										user_model_id: user._id,
										account_model_id: account._id,
										token
									})
								})
							}
						})
					}
				})
			}

		})

	})

	app.post('/api/login/admin', (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		}

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
			password: req.body.password,
			type: 'admin'
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Cannot find account.')
				return res.status(404).send('Cannot find account.')
			} else {
				// Found the account!!!
				// now find the user who has this account
				User.findOne({
					account: account._id
				}, (err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!user) {
						console.log('Cannot find user.')
						return res.status(404).send('Cannot find user.')
					} else {
						// Found the user!!!
						// now find the admin who is this user
						Admin.findOne({
							user: user._id
						}, (err, admin) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!admin) {
								console.log('Cannot find admin.')
								return res.status(404).send('Cannot find admin.')
							} else {
								// Found it!!!
								console.log(account.userid + ' logged in successfully')
								// return auth token in response
								return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({
										id: account.userid,
										password: account.password,
										name: user.username,
										contactInfo: user.contactInfo,
										admin_model_id: admin._id,
										user_model_id: user._id,
										account_model_id: account._id,
										token
									})
								})
							}
						})
					}
				})
			}

		})

	})
}