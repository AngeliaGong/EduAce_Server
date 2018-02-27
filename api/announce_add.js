const User = require('../models/User')
const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Announcement = require('../models/Announcement')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    app.post('/api/announce/add', (req, res) => {
        if(!(req.headers.token && req.body.course_id 
            && req.body.announcement)) {
                return res.status(400).send('Missing parameters.')
            }
        
        jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
            if(err) {
                return res.status(401).send(err.message)
            }
            if(decoded.account.type !== 'teacher') {
                return res.status(401).send('Deny')
            }
            account = decoded.account
            Course.findById(req.body.course_id, (err, course) => {
                if(err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if(!course) {
                    console.log('Cannot find course.')
				    return res.status(401).send('Cannot find course.')
                } else {
                    User.findOne({
                        account: account._id
                    }, (err, user) => {
                        if(err) {
                            console.log(err)
                            return res.status(401).send(err.message)
                        } else if(!user) {
                            console.log('Cannot find user.')
				            return res.status(401).send('Cannot find user.')
                        } else {
                            Teacher.findOne({
                                user: user._id
                            }, (err, teacher) => {
                                if(err) {
                                    console.log(err)
                                    return res.status(401).send(err.message)
                                } else if(!teacher) {
                                    console.log('Cannot find teacher.')
                                    return res.status(401).send('Cannot find teacher.')
                                } else {
                                    if(teacher._id !== course.teacher) {
                                        return res.status(401).send('Deny')
                                    }
                                    var announce = new Announcement(req.body.announcement)
                                    announce.save((err, announce) => {
                                        if (err) {
                                            console.log(err)
                                            return res.status(401).send(err.message)
                                        } else {

                                            course.announcements.push(announce._id)
                                            course.save((err, course) => {
                                                if(err) {
                                                    console.log(err)
                                                    return res.status(401).send(err.message)
                                                } else {
                                                    return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
                                                        res.status(200).json({
                                                            token: token,
                                                            announcement: course.announcements
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
                }
            })
        })
    })

}
