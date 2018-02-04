const Account = require('../models/Account')
const User = require('../models/User')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Admin = require('../models/Admin')
const Class = require('../models/Class')

var db_student_init = (i_userid, i_password, i_classid) => {
	var new_account = new Account ({
		userid: i_userid,
		password: i_password,
		type: i_password
	})

	new_account.save((err, new_account) => {
		if (err) {
			console.err(err)
		} else {
			console.log('Student account created successfully.')
		}
	})

	var new_user = new User({
		account: new_account,
		username: 'name of ' + i_userid,
		contactInfo: 'contactInfo of ' + i_userid,
	})

	new_user.save((err, new_user) => {
		if (err) {
			console.err(err)
		} else {
			console.log ('Student user created successfully.')
		}
	})

	var new_student = new Student({
		user: new_user, 
		grade: 10,
		courses: []
	})

	new_student.save((err, new_student) => {
		if (err) {
			console.err(err)
		} else {
			console.log ('Student created successfully.')
		}
	})
}

var db_TCS_init = (i_userid, i_password, i_className) => {
	var new_account = new Account ({
		userid: i_userid,
		password: i_password,
		type: i_password
	})

	new_account.save((err, new_account) => {
		if (err) {
			console.err(err)
		} else {
			console.log('Teacher account created successfully.')
		}
	})

	var new_user = new User({
		account: new_account,
		username: 'name of ' + i_userid,
		contactInfo: 'contactInfo of ' + i_userid,
	})

	new_user.save((err, new_user) => {
		if (err) {
			console.err(err)
		} else {
			console.log ('Teacher user created successfully.')
		}
	})

	var new_teacher = new Teacher({
		user: new_user, 
		office: 'office of ' + i_userid
	})

	new_teacher.save((err, new_teacher) => {
		if (err) {
			console.err(err)
		} else {
			console.log ('Teacher created successfully.')

			var new_class = new Class ({
				classname: i_className,
				teacher: new_teacher._id
			})

			new_class.save((err, new_class) => {
				if (err) {
					console.err(err)
				} else {
					console.log ('Class created successfully.')
					for (var i = 0; i < 5; i++) {
						db_user_init('student' + i, 'pwstudent' + i, new_class._id)
					}
				}
			})
		}
	})
}

var db_admin_init = (i_userid, i_password) => {
	var new_account = new Account ({
		userid: i_userid,
		password: i_password,
		type: i_password
	})

	new_account.save((err, new_account) => {
		if (err) {
			console.err(err)
		} else {
			console.log('Teacher account created successfully.')
		}
	})

	var new_user = new User({
		account: new_account,
		username: 'name of ' + i_userid,
		contactInfo: 'contactInfo of ' + i_userid,
	})

	new_user.save((err, new_user) => {
		if (err) {
			console.err(err)
		} else {
			console.log ('Teacher user created successfully.')
		}
	})

	var new_admin = new Admin({
		user: new_user
	})

	new_teacher.save((err, new_teacher) => {
		if (err) {
			console.err(err)
		} else {
			console.log ('Teacher created successfully.')
		}
	})
}


var db_userClass_init = () => {

	for (var i = 0; i < 5; i++) {
		db_TCS_init('teacher' + i, 'pwteacher' + i, 'teacher')
		db_admin_init('admin' + i, 'pwadmin' + i, 'admin')
	}
}

module.export = db_userClass_init