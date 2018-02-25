const User = require('../models/User')
const Teacher = require('../models/Teacher')
const Question = require('../models/Question')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    /*
        request body (JSON): 
        {
            token: "...",
            question_id: "...",
            question_title: "...",
            question_content: "..."
        }
    */
    app.post('/api/question/edit', (req, res) => {
        if(!(req.body.token && req.body.question_id 
            && req.body.question_title && req.body.question_content)) {
                return res.status(400).send('Missing parameters.')
            }
            jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
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
                        console.log('Cannot find user.')
                        return res.status(404).send('Cannot find user.')
                    } else {
                        Question.findById(req.body.question_id, (err, question) => {
                            if(err) {
                                console.log(err)
                                return res.status(401).send(err.message)
                            } else if(!question) {
                                console.log('Cannot find question.')
                                return res.status(404).send('Cannot find question.')
                            } else {
                                if(account.type !== 'admin'
                                || user._id !== question.askedby) {
                                    return res.status(401).send('Deny')
                                }

                                question.title = req.body.question_title
                                question.content = req.body.question_content
                                question.save((err, question) => {
                                    if(err) {
                                        console.log('Some exceptions raised.')
                                        return res.status(401).send(err.message)
                                    } else {
                                        return jwt.sign({account}, 'secretkey', {expiresIn: '3d'}, 
                                        (err,tok) => {
                                            res.status(200).json({
                                                token: tok,
                                                question: question
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
