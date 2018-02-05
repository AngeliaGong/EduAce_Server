module.exports = (app) => {
	// a temporary testing api that requires authentication token in the header
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

	// FORMAT OF TOKEN: 
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
}