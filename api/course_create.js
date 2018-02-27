const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    app.post('/api/course/create', (req, res) => {
        if(!(req.headers.token && req.body.coursename 
            && req.body.teacher_id && req.body.schedule)) {
                return res.status(400).send('Missing parameters.')
            }

        jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
            if(err) {
                return res.status(401).send(err.message)
            }
            if(decoded.account.type !== 'admin' ) {
                return res.status(401).send('Deny')
            }
            account = decoded.account
            Teacher.findById(req.body.teacher_id, (err, teacher) => {
                if (err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if (!teacher) {
                    console.log('Cannot find teacher.')
                    return res.status(404).send('Cannot find teacher.')
                } else {
                    var course = new Course({
                        coursename: req.body.coursename,
                        teacher: teacher._id,
                        schedule: req.body.schedule,
                        announcements: [],
                        questions: []
                    })
                    course.save((err, course) => {
                        if (err) {
                            console.log(err)
                            return res.status(401).send(err.message)
                        } else {
                            console.log ('course created successfully.')
                            return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
                                res.status(200).json({
                                    token: token
                                })
                            })
                        }
                    })
                }
            })
        })
    })
}
