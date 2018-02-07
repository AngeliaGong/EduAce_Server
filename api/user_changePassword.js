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
	app.post('/api/change_self_password', VerifyToken, (req,res)=> {
		// validate presence of parameters
		if (!(req.body.userid && req.body.old_password && req.body.new_password)) {
			return res.status(400).send('Missing parameters.')
		}

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid,
			password: req.body.old_password
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

				// change password if requested
				if (req.body.new_password) {
					account.password = req.body.password
					account.save((err, account) => {
						if (err) {
							console.log(err)
							return res.status(401).send(err.message)
						} else if (!account) {
							console.log('Account is not saved successfully')
							return res.status(401).send('Account is not saved successfully')
						} else {
							return res.status(200).send('Account changes has been updated.')
							console.log('Account password has been saved successfully')
						}
					})
				}
			}

		}

	})

	app.post('/api/admin_change_password', VerifyToken, (req,res)=> {
		// validate presence of parameters
		if (!(req.body.admin_userid && req.body.admin_password && 
			req.body.target_userid && req.body.target_password)) {
			return res.status(400).send('Missing parameters.')
		}

		// verify login to be admin
		Account.findOne({
			userid: req.body.admin_userid,
			password: req.body.admin_password,
			type: 'admin'
		}, (err, admin) => {
			if (err) {
				console.log(err)
				return res.status(401).send(err.message)
			} else if (!admin) {
				console.log('Not authorized to change password.')
				return res.status(401).send('Not authorized to perform desired change.')
			} else {
				Account.findOne({
					userid:req.body.target_userid,
					password:req.body.target_password
				}, (err, account) => {
					if (err) {
						console.log(err)
						return res.status(401).send(err.message)
					} else if (!account) {
						console.log('Account not found.')
						return res.status(404).send('Account not found')
					} else {
						account.password = req.body.target_password

						account.save((err, account) => {
							if (err) {
								console.log(err)
								return res.status(401).send(err.message)
							} else if (!account) {
								console.log('Account is not saved successfully')
								return res.status(401).send('Account is not saved successfully')
							} else {
								return res.status(200).send('Account changes has been updated.')
								console.log('Account password has been saved successfully')
							}
						})
					}
				})
			}
		})
	})
}