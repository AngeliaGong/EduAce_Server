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
	app.post('/api/change_password', VerifyToken, (req,res)=> {
		// request body reinforcement
		if (!(req.body.userid && req.body.password)) {
			return res.status(400).send('Missing parameters.')
		}

		// check if user is logged in, or if it's logged in as admin
		var loginAccount
		jwt.decode('secretkey', req.token, (err, account) => {
		    if (err) {
		    	console.log(err.name, err.message)
		    	return res.status(401).send (err)
		    } else  if (account.id != req.body.id || account.type != 'admin') {
	    		return res.status(401).send('Unauthorized action. Pleas login as appropriate user.')
		    } else {
		    	loginAccount = account
		    }
	    })

		Account.findOne({
			// find the account corresponding to the user input
			userid: req.body.userid
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
				if (req.body.password) {
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

		})
	})
}