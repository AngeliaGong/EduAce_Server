const User = require('../models/User')
const Answer = require('../models/Answer')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    app.post('/api/answer/edit', (req, res) => {
        if(!(req.headers.token && req.body.answer_id 
            && req.body.content)) {
                return res.status(400).send('Missing parameters.')
            }
            jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
                if(err) {
                    return res.status(401).send(err.message)
                }
                account = decoded.account

                User.findOne({
                    account: account._id
                }, (err, user) => {
                    if(err) {
                        console.log(err)
                        return res.status(401).send(err.message)
                    } else if(!user) {
                        console.log('User not found.')
                        return res.status(401).send('User not found.')
                    } else {
                        Answer.findById(req.body.answer_id, (err, answer) => {
                            if(err) {
                                console.log(err)
                                return res.status(401).send(err.message)
                            } else if(!user) {
                                console.log('Answer not found.')
                                return res.status(401).send('Answer not found.')
                            } else {
                                if(user._id !== answer.madeby) {
                                    return res.status(401).send('Deny.')
                                }
                                answer.content = req.body.content
                                answer.save((err, answer) => {
                                    if(err) {
                                        console.log(err)
                                        return res.status(401).send(err.message)
                                    } else if(!answer) {
                                        console.log('Failed to save the answer.')
                                        return res.status(401).send('Failed to save the answer.')
                                    } else {
                                        question.answers.push(answer._id)
                                        question.save((err, question) => {
                                            return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, (err,token) => {
                                                res.status(200).json({
                                                    token: token,
                                                    answer: answer
                                                })
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
