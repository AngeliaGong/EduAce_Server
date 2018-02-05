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