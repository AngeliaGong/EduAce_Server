const UserLogin = require('../models/UserLogin')

var db_userlogin_init = () => {
	var student = new UserLogin({
		userid: 'studentid',
		password: 'test123',
		type: 'student'
	})
	student.save((err, student) => {
		if (err) {
			console.err(err)
		} else {
			console.log('Student created successfully.')
		}
	})

	var teacher = new User({
		userid: 'teacherid',
		password: 'test123',
		type: 'teacher'
	})

	teacher.save((err, teacher) => {
		if (err) {
			console.err(err)
		} else {
			console.log('Teacher created successfully.')
		}
	})

	var admin = new User({
		userid: 'adminid',
		password: 'test123',
		type: 'admin'
	})

	admin.save((err, admin) => {
		if (err) {
			console.err(err)
		} else {
			console.log('Admin created successfully.')
		}
	})
}

module.export = db_userlogin_init