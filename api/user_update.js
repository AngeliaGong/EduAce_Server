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
	app.post('/api/update/student', (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid)) {
			return res.status(400).send('Missing parameters.')
		}

		// check if user is logged in as admin
		var loginAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.type != 'admin') {
	    		return res.status(401).send('Unauthorized action. Pleas login as appropriate user.')
		    } else {
		    	loginAccount = account
		    }
	    })

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Cannot find account.')
				return res.status(401).send('Cannot find account.')
			} else {
				// Found the account!!!
				console.log('Account is found.')

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
						if (req.body.name) {
							user.username = req.body.name
						}
						if (req.body.contactInfo) {
							user.contactInfo = req.body.contactInfo
						}

						user.save((err, user) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!account) {
								console.log('User is not saved successfully')
								return res.status(401).send('User is not saved successfully')
							} else {
								console.log('User has been saved successfully')
							}
						})

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

								// Update info
								if  (req.body.grade) {
									student.grade = req.body.grade
								}
								if (req.body.class) {
									student.class = req.body.class
								}
								if (req.body.courses) {
									student.courses = req.body.courses
								}

								student.save((err, account) => {
									if (err) {
										console.log(err)
										return res.status(401).send(err.message)
									} else if (!student) {
										console.log('Student is not saved successfully')
										return res.status(401).send('Student is not saved successfully')
									} else {
										// return auth token in response
										return jwt.sign({loginAccount}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
											res.status(200).json({
												message: 'Student has been updated successfully.',
												id: account.userid,
												name: user.username,
												contactInfo: user.contactInfo,
												grade: student.grade,
												class_id: student.class,
												courses: student.courses,
												token
											})
										})
									}
								})

							}
						})
					}
				})
			}

		})

	})


	app.post('/api/update/teacher', (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid)) {
			return res.status(400).send('Missing parameters.')
		}

		// check if user is logged in as admin or self
		var loginAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.type != 'admin' || account.userid != req.body.userid) {
	    		return res.status(401).send('Unauthorized action. Pleas login as appropriate user.')
		    } else {
		    	loginAccount = account
		    }
	    })

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Cannot find account.')
				return res.status(401).send('Cannot find account.')
			} else {
				// Found the account!!!
				console.log('Account is found.')

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
						if (req.body.name) {
							user.username = req.body.name
						}
						if (req.body.contactInfo) {
							user.contactInfo = req.body.contactInfo
						}

						user.save((err, user) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!account) {
								console.log('User is not saved successfully')
								return res.status(401).send('User is not saved successfully')
							} else {
								console.log('User has been saved successfully')
							}
						})

						// now find the teacher who is this user
						Teacher.findOne({
							user: user._id
						}, (err, teacher) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!student) {
								console.log('Cannot find user.')
								return res.status(401).send('Cannot find user.')
							} else {
								// Found it!!!

								// Update info
								if  (req.body.office) {
									teacher.office = req.body.office
								}
								if (req.body.class) {
									teacher.class = req.body.class
								}
								if (req.body.courses) {
									teacher.courses = req.body.courses
								}

								teacher.save((err, teacher) => {
									if (err) {
										console.log(err)
										return res.status(401).send(err.message)
									} else if (!teacher) {
										console.log('Student is not saved successfully')
										return res.status(401).send('Student is not saved successfully')
									} else {
										// return auth token in response
										return jwt.sign({loginAccount}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
											res.status(200).json({
												message: 'Student has been updated successfully.',
												id: account.userid,
												name: user.username,
												contactInfo: user.contactInfo,
												office: teacher.office,
												class_id: teacher.class,
												courses: teacher.courses,
												token
											})
										})
									}
								})

							}
						})
					}
				})
			}

		})

	})

	app.post('/api/update/admin', (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid)) {
			return res.status(400).send('Missing parameters.')
		}

		// check if user is logged in as admin
		var loginAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.type != 'admin') {
	    		return res.status(401).send('Unauthorized action. Pleas login as appropriate user.')
		    } else {
		    	loginAccount = account
		    }
	    })

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
		}, (err, account) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!account) {
				console.log('Cannot find account.')
				return res.status(401).send('Cannot find account.')
			} else {
				// Found the account!!!
				console.log('Account is found.')

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
						if (req.body.name) {
							user.username = req.body.name
						}
						if (req.body.contactInfo) {
							user.contactInfo = req.body.contactInfo
						}

						user.save((err, user) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!account) {
								console.log('User is not saved successfully')
								return res.status(401).send('User is not saved successfully')
							} else {
								console.log('User has been saved successfully')
							}
						})
					}
				})
			}

		})

	})
}