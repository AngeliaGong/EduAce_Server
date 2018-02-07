/***********************************/
/* Creator: Gong                   */
/* Status: Finished                */
/* Time: Feb.7,2018                */
/***********************************/

// library
const jwt = require('jsonwebtoken')

// FORMAT OF TOKEN: 
// Authorization: Bearer <access_token>
// verify token 
var VerifyToken = (req,res,next) => {
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

		jwt.verify(req.token, 'secretkey', (err, authData) => {
			if (err) {
				return res.sendStatus(403).send(err)
			} 
		})

		// next middleware
		next()
	} else {
		// Forbidden
		return res.status(403).json({
			error: 'Unauthorized'
		})
	}
}

module.exports = VerifyToken