const Account = require('../models/Account')
const User = require('../models/User')
const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Announcement = require('../models/Announcement')
const Question = require('../models/Question')
const jwt = require('jsonwebtoken')


module.exports = (app) => {
    /* 
        request body (JSON): 
        {
            token: "...",
            coursename: "...",
            teacher_id: "...",
            schedule: [...]
        }
    */
    app.post('/api/course/create', (req, res) => {
        if(!(req.body.token && req.body.coursename 
            && req.body.teacher_id && req.body.schedule)) {
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
            Teacher.findById(req.body.teacher_id, (err, teacher) => {
                if (err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if (!Teacher) {
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
                        }
                        else {
                            console.log ('course created successfully.')
                            return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                res.status(200).json({
                                    token: tok
                                })
                            })
                        }
                    })
                }
            })
        })
    })

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
                            removed_course: course._id
                        })
                    })
                }
            })
        })
    })

    /*
        request body (JSON): 
        {
            token: "...",
            course_id: "...",
            announcement: [...]
        }
    */
    app.post('/api/course/announce', (req, res) => {
        if(!(req.body.token && req.body.course_id 
            && req.body.announcement)) {
                return res.status(400).send('Missing parameters.')
            }
        
        jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
            if(err) {
                return res.status(401).send(err.message)
            }
            if(decoded.account.type !== 'teacher') {
                return res.status(401).send('Deny')
            }
            account = decoded.account
            Course.findById(req.body.course_id, (err, course) => {
                if (err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if(!course) {
                    console.log('Cannot find course.')
				return res.status(401).send('Cannot find course.')
                } else {
                    console.log('Course found.')

                    if(account._id !== course.teacher) {
                        return res.status(401).send('Deny')
                    }
                    req.body.announcement.forEach(element => {
                        var ann = new Announcement({
                            title: element.title,
                            content: element.content,
                            isPublic: element.isPublic,
                            madeby: account._id
                        })
                        ann.save((err, ann) => {
                            if(err) {
                                console.log('Some exceptions raised.')
                            } else {
                                course.announcements.push(ann._id)
                            }
                        })
                    })

                    course.save((err, course) => {
                        if(err) {
                            console.log(err)
                            return res.status(401).send(err.message)
                        } else if(!course) {
                            console.log('Save course failed.')
                            return res.status(401).send('Save course failed.')
                        } else {
                            return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                res.status(200).json({
                                    token: tok,
                                    announcement: course.announcement
                                })
                            })
                        }
                    })
                }
            })
        })
    })

    /*
        request body (JSON): 
        {
            token: "...",
            course_id: "...",
            announcement_id: "..."
        }
    */
    app.post('/api/course/delete_announcement', (req, res) => {
        if(!(req.body.token && req.body.course_id 
            && req.body.announcement_id)) {
                return res.status(400).send('Missing parameters.')
            }
        jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
            if(err) {
                return res.status(401).send(err.message)
            }
            if(decoded.account.type !== 'teacher') {
                return res.status(401).send('Deny')
            }
            account = decoded.account
            Course.findById(req.body.course_id, (err, course) => {
                if (err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if(!course) {
                    console.log('Cannot find course.')
				return res.status(401).send('Cannot find course.')
                } else {
                    console.log('Course found.')

                    if(account._id !== course.teacher) {
                        return res.status(401).send('Deny')
                    }
                    Announcement.findByIdAndRemove(req.body.announcement_id, (err, ann) => {
                        if (err) {
                            console.log(err)
                            return res.status(401).send(err.message)
                        } else if (!ann) {
                            console.log('Announcement not found.')
                            return res.status(401).send('Announcement not found.')
                        } else {
                            console.log('Announcement deleted.')
                            
                            course.announcements.forEach((item, index) => {
                                if(item._id === req.body.announcement_id) {
                                    course.announcements.splice(index, 1)
                                    break
                                }
                            })
                            course.save((err, course) => {
                                return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                    res.status(200).json({
                                        token: tok,
                                        removed_announcement: req.body.announcement_id
                                    })
                                })
                            })
                        }
                    })
                }
            })
        })
    })
}
