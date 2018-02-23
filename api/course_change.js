const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const jwt = require('jsonwebtoken')


module.exports = (app) => {
    /*
        request body (JSON):
        {
            token: "...",
            course_id: "...",
            coursename: "...",
            teacher_id: "...",
            schedule: [...]
        }
    */
    app.post('/api/course/change', (req, res) => {
        if(!(req.body.token && req.body.course_id
            &&req.body.coursename && req.body.teacher_id 
            && req.body.schedule)) {
                return res.status(400).send('Missing parameters.')
            }
        
        jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
            if(err) {
                return res.status(401).send(err.message)
            }
            if(decoded.account.type !== 'admin') {
                return res.status(401).send('Deny')
            }
            account = decoded.account

            Teacher.findById(req.body.teacher_id, (err, teacher) => {
                if(err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if(!teacher) {
                    console.log('Cannot find teacher.')
                    return res.status(404).send('Cannot find teacher.')
                } else {
                    Course.findById(req.body.course_id, (err, course) => {
                        if(err) {
                            console.log(err)
                            return res.status(401).send(err.message)
                        } else if(!course) {
                            console.log('Cannot find course.')
                            return res.status(404).send('Cannot find course.')
                        } else {
                            course.coursename = req.body.coursename
                            course.teacher = req.body.teacher_id
                            course.schedule = req.body.schedule

                            course.save((err, course) => {
                                if(err) {
                                    console.log(err)
                                    return res.status(401).send(err.message)
                                } else {
                                    console.log ('course changed successfully.')
                                    return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
                                        res.status(200).json({
                                            token: token,
                                            course: course
                                        })
                                    })
                                }
                            })
                        }
                    })
                }

            })
        })
    })
}
