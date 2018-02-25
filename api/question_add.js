const User = require('../models/User')
const Course = require('../models/Course')
const Question = require('../models/Question')
const jwt = require('jsonwebtoken')


module.exports = (app) => {
    /*
        request body (JSON):
        {
            token: "...",
            course_id: "...",
            question_title: "...",
            question_content: "..."
        }
    */
    app.post('/api/question/add', (req, res) => {
        if(!(req.body.token && req.body.course_id 
            && req.body.question_title && req.body.question_content)) {
                return res.status(400).send('Missing parameters.')
            }
            jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
                if(err) {
                    return res.status(401).send(err.message)
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
                                return res.status(404).send('Cannot find user.')
                            } else {
                                var que = new Question({
                                    title: req.body.title,
                                    content: req.body.content,
                                    askedby: user._id,
                                    answers: [],
                                })
                                que.save((err, que) => {
                                    if(err) {
                                        console.log('Some exceptions raised.')
                                        return res.status(401).send(err.message)
                                    } else {
                                        course.questions.push(que.id)
                                        course.save((err, course) => {
                                            if(err) {
                                                console.log(err)
                                                return res.status(401).send(err.message)
                                            } else if(!course) {
                                                console.log('Save course failed.')
                                                return res.status(401).send('Save course failed.')
                                            } else {
                                                return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, 
                                                (err,tok) => {
                                                    res.status(200).json({
                                                        token: tok,
                                                        question: que
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
            })
    })

}
