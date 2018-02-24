const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    app.post('/api/answer/delete', (req, res) => {
        if(!(req.body.token && req.body.question_id 
            && req.body.answer_id)) {
                return res.status(400).send('Missing parameters.')
            }
            jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
                if(err) {
                    return res.status(401).send(err.message)
                }
                account = decoded.account

                Question.findById(req.body.question_id, (err, question) => {
                    if(err) {
                        console.log(err)
                        return res.status(401).send(err.message)
                    } else if(!question) {
                        console.log('Question not found.')
                        return res.status(401).send('Question not found.')
                    } else {
                        for(var index in question.answers) {
                            if(question.answers[index] === req.body.answer_id) {
                                Answer.findById(req.body.answer_id, (err, answer) => {
                                    if(err) {
                                        console.log(err)
                                        return res.status(401).send(err.message)
                                    } else if(!answer) {
                                        console.log('Answer not found.')
                                        return res.status(401).send('Answer not found.')
                                    } else {
                                        if(account.type === 'admin'
                                        || ((account_id) => {
                                            User.findOne({
                                                account: account_id
                                            }, (err, user) => {
                                                if(err) {
                                                    return false
                                                } else if(!user) {
                                                    return false
                                                } else {
                                                    if(user._id === answer.madeby) {
                                                        return true
                                                    } else {
                                                        return false
                                                    }
                                                }
                                            })
                                        })(account._id)) {
                                            Answer.findByIdAndRemove(req.body.answer_id, (err, answer) => {
                                                if(err) {
                                                    console.log(err)
                                                    return res.status(401).send(err.message)
                                                } else {
                                                    question.answers.splice(index, 1)
                                                    question.save((err, question) => {
                                                        return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,tok) => {
                                                            res.status(200).json({
                                                                token: tok,
                                                                removed_answer: answer
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    }
                                })
                                break
                            }
                        }
                        return res.status(401).send('Answer not found.')
                    }
                })
            })
    })

}
