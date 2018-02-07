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
	app.post('/api/remove/student', VerifyToken, (req,res)=> {
		// request body reinforcement
		if (!req.body.userid ) {
			return res.status(400).send('Missing parameters.')
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

		Account.findOneAndRemove({
			// find and remove the account corresponding to the user input
			userid: req.body.userid,
			type: 'student'
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Account not found.')
				return res.status(401).send('Account not found.')
			} else {
				// Found the account!!!
				console.log('Student account found and removed.')
				// now find and remove the user who has this account
				User.findOneAndRemove({
					account: account._id
				}, (err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!user) {
						console.log('User not found.')
						return res.status(401).send('User not found.')
					} else {
						// Found the user!!!
						console.log('Student user found and removed.')
						// now find and removethe student who is this user
						Student.findOneAndRemove({
							user: user._id
						}, (err, student) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!student) {
								return res.status(401).send('Student not found.')
							} else {
								console.log('Student found and removed.')
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

	app.post('/api/remove/teacher', VerifyToken, (req,res)=> {
		// request body reinforcement
		if (!req.body.userid ) {
			return res.status(400).send('Missing parameters.')
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

		Account.findOneAndRemove({
			// find and remove the account corresponding to the user input
			userid: req.body.userid,
			type: 'teacher'
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Account not found.')
				return res.status(401).send('Account not found.')
			} else {
				// Found the account!!!
				console.log('Teacher account found and removed.')
				// now find and remove the user who has this account
				User.findOneAndRemove({
					account: account._id
				}, (err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!user) {
						console.log('User not found.')
						return res.status(401).send('User not found.')
					} else {
						// Found the user!!!
						console.log('Teacher user found and removed')
						// now find and remove the teacher who is this user
						Teacher.findOneAndRemove({
							user: user._id
						}, (err, teacher) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!teacher) {
								return res.status(401).send('Teacher not found.')
							} else {
								console.log('Teacher found and removed.')
								return jwt.sign({adminAccount}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
									res.status(200).json({teacher, user, account, token})
								})
							}
						})
					}
				})
			}

		})

	})

	app.post('/api/remove/admin', VerifyToken, (req,res)=> {
		// request body reinforcement
		if (!req.body.userid ) {
			return res.status(400).send('Missing parameters.')
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

		Account.findOneAndRemove({
			// find and remove the account corresponding to the user input
			userid: req.body.userid,
			type: 'admin'
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Account not found.')
				return res.status(401).send('Account not found.')
			} else {
				// Found the account!!!
				console.log('Admin account found and removed')
				// now find and remove the user who has this account
				User.findOneAndRemove({
					account: account._id
				}, (err, user) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!user) {
						console.log('User not found.')
						return res.status(401).send('User not found.')
					} else {
						// Found the user!!!
						console.log('Admin user found and removed')
						// now find and remove the admin who is this user
						Admin.findOneAndRemove({
							user: user._id
						}, (err, admin) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!admin) {
								return res.status(401).send('Admin not found.')
							} else {
								console.log('Admin found and removed')
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