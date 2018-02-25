const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Question = require('../models/Question')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    app.post('/api/question/delete', (req, res) => {
        if(!(req.body.token && req.body.course_id 
            && req.body.question_id)) {
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
                                for(var index in course.questions) {
                                    if(course.questions[index] === req.body.question_id) {
                                        Question.findById(req.body.question_id, (err, question) => {
                                            if(err) {
                                                console.log(err)
                                                return res.status(401).send(err.message)
                                            } else if(!question) {
                                                console.log('Cannot find question.')
                                                return res.status(404).send('Cannot find question.')
                                            } else {
                                                if(account.type === 'admin'
                                                || User._id === question.askedby
                                                || (account.type === 'teacher' 
                                                    && ((user_id) => {
                                                        Teacher.findOne({
                                                            user: user_id
                                                        }, (err, teacher) => {
                                                            if(err) {
                                                                return false
                                                            } else if(!teacher) {
                                                                return false
                                                            } else {
                                                                return teacher._id === course.teacher
                                                            }
                                                        })
                                                    })(user._id))) {
                                                        Question.findByIdAndRemove(question._id, (err, question) => {
                                                            if(err) {
                                                                console.log(err)
                                                                return res.status(401).send(err.message)
                                                            } else {
                                                                course.question.splice(index, 1)
                                                                course.save((err, course) => {
                                                                    return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                                                        res.status(200).json({
                                                                            token: tok,
                                                                            removed_question: question
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                        })
                                                    } else {
                                                        return res.status(401).send('Deny')
                                                    }

                                            }
                                        })
                                        break
                                    }
                                }
                                return res.status(404).send('Question not found.')
                            }
                        })
                    }
                })
            })
    })

}
