const Course = require('../models/Course')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
    /*
        request body (JSON): 
        {
            token: "...",
            course_id: "..."
        }
    */
    app.post('/api/course/delete', (req, res) => {
        if(!(req.body.token && req.body.course_id)) {
            return res.status(400).send('Missing parameters.')
        }

        jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
            if(err) {
                return res.status(401).send(err.message)
            }
            if(decoded.account.type !== 'admin' ) {
                return res.status(401).send('Deny')
            }
            account = decoded.account
            Course.findByIdAndRemove(req.body.course_id, (err, course) => {
                if (err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if (!course) {
                    console.log('Course not found.')
                    return res.status(401).send('Course not found.')
                } else {
                    console.log('Course deleted.')
                    return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                        res.status(200).json({
                            token: tok,
                            removed_course: course
                        })
                    })
                }
            })
        })
    })

}
