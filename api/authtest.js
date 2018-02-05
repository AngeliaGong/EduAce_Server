const VerifyToken = require('./VerifyToken')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
	// a temporary testing api that requires authentication token in the header
	app.post('/api/authtest', VerifyToken, (req,res) => {
		jwt.verify(req.token, 'secretkey', (err, authData) => {
			if (err) {
				return res.sendStatus(403).send(err)
			} else {
				return jwt.sign({}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
					res.status(200).json({
						message: 'Authenticated',
						token
					})
				})
			}
		})
	})
}