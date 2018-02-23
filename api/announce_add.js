const Course = require('../models/Course')
const Announcement = require('../models/Announcement')
const jwt = require('jsonwebtoken')


module.exports = (app) => {
    /*
        request body (JSON): 
        {
            token: "...",
            course_id: "...",
            announcement: {
                title: "...",
		        content: "...",
		        isPublic: t/f,
		        madeby: "..."
            }
        }
    */
    app.post('/api/announce/add', (req, res) => {
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
                if(err) {
                    console.log(err)
                    return res.status(401).send(err.message)
                } else if(!course) {
                    console.log('Cannot find course.')
				    return res.status(401).send('Cannot find course.')
                } else {
                    if(account._id !== course.teacher) {
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
                                    return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                        res.status(200).json({
                                            token: tok,
                                            announcement: req.body.announcement
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
