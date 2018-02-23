const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Announcement = require('../models/Announcement')
const jwt = require('jsonwebtoken')


module.exports = (app) => {
    /*
        request body (JSON):
        {
            token: "...",
            course_id: "...",
            announcement_id: "..."
        }
    */
    app.post('/api/announce/delete', (req, res) => {
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
                    if(account._id !== course.teacher) {
                        return res.status(401).send('Deny')
                    }
                    for(var index in course.announcements) {
                        if(course.announcements[index] === 
                            req.body.announcement_id) {
                                Announcement.findByIdAndRemove(req.body.announcement_id, (err, announce) => {
                                    if (err) {
                                        console.log(err)
                                        return res.status(401).send(err.message)
                                    } else if (!announce) {
                                        console.log('Announcement not found.')
                                        return res.status(401).send('Announcement not found.')
                                    } else {
                                        course.announcements.splice(index, 1)
                                        course.save((err, course) => {
                                            return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                                res.status(200).json({
                                                    token: tok,
                                                    removed_announcement: announce
                                                })
                                            })
                                        })
                                    }
                                })
                                break
                            }
                        
                    }
                }
            })
        })
    })

}
