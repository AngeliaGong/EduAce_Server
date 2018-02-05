const Account = require('../models/Account')
const User = require('../models/User')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
	// // OUT OF DATE
	// app.post('/api/login', (req, res)=> { 
	// 	// if any parameter is missing (undefined), return 400.
	// 	if (!(req.body.userid && req.body.password && req.body.type)) {
	// 		return res.status(400).send('Missing parameters.')
	// 	}

	// 	// else, find user from databse and signin
	// 	Account.findOne({
	// 		type: req.body.type,
	// 		userid: req.body.userid,
	// 		password: req.body.password
	// 	}, (err, account) => {
	// 		if (err) {
	// 			// unknown system or database error, including no such credentials. return 401
	// 			console.log(err)
	// 			return res.status(401).send(err.message)
	// 		} else if (!account) {
	// 			console.log('Wrong userid or password')
	// 			return res.status(401).send('Wrong userid or password')
	// 		} else {
	// 			// return authentication token
	// 			console.log(account.userid + ' logged in successfully')
	// 			return jwt.sign({account}, 'secretkey', {expiresIn : '7d'}, (err, token) => {
	// 				res.status(200).json({
	// 					token
	// 				})
	// 			})
	// 		}
	// 	})
	// })

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
				return res.status(401).send('Cannot find account.')
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
						return res.status(401).send('Cannot find user.')
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
								return res.status(401).send('Cannot find teacher.')
							} else {
								// Found it!!!
								console.log(account.userid + ' logged in successfully')
								// return auth token in response
								return jwt.sign({teacher}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({
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
				return res.status(401).send('Cannot find account.')
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
						return res.status(401).send('Cannot find user.')
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
								console.log('Cannot find user.')
								return res.status(401).send('Cannot find user.')
							} else {
								// Found it!!!
								console.log(account.userid + ' logged in successfully')
								// return auth token in response
								return jwt.sign({student}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({
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
				return res.status(401).send('Cannot find account.')
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
						return res.status(401).send('Cannot find user.')
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
								console.log('Cannot find user.')
								return res.status(401).send('Cannot find user.')
							} else {
								// Found it!!!
								console.log(account.userid + ' logged in successfully')
								// return auth token in response
								return jwt.sign({admin}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({
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