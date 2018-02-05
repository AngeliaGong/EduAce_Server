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
			console.log(err)
		} else {
			console.log('Student account created successfully.')

			var new_user = new User({
				account: new_account._id,
				username: 'name of ' + i_userid,
				contactInfo: 'contactInfo of ' + i_userid,
			})

			new_user.save((err, new_user) => {
				if (err) {
					console.log(err)
				} else {
					console.log ('Student user created successfully.')

					var new_student = new Student({
						user: new_user._id, 
						grade: 10,
						courses: []
					})

					new_student.save((err, new_student) => {
						if (err) {
							console.log(err)
						} else {
							console.log ('Student created successfully.')
						}
					})
				}
			})
		}
	})
}

var db_TCS_init = (i_userid, i_password, i_className, index) => {
	var new_account = new Account ({
		userid: i_userid,
		password: i_password,
		type: i_password
	})

	new_account.save((err, new_account) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Teacher account created successfully.')
			var new_user = new User({
				account: new_account._id,
				username: 'name of ' + i_userid,
				contactInfo: 'contactInfo of ' + i_userid,
			})

			new_user.save((err, new_user) => {
				if (err) {
					console.log(err)
				} else {
					console.log ('Teacher user created successfully.')

					var new_teacher = new Teacher({
						user: new_user._id, 
						office: 'office of ' + i_userid
					})

					new_teacher.save((err, new_teacher) => {
						if (err) {
							console.log(err)
						} else {
							console.log ('Teacher created successfully.')

							var new_class = new Class ({
								classname: i_className,
								teacher: new_teacher._id
							})

							new_class.save((err, new_class) => {
								if (err) {
									console.log(err)
								} else {
									console.log ('Class created successfully.')
									for (var i = 0; i < 5; i++) {
										db_student_init('student' + index + i, 'pwstudent' + index + i, new_class._id)
									}
								}
							})
						}
					})
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
			console.log(err)
		} else {
			console.log('Admin account created successfully.')

			var new_user = new User({
				account: new_account._id,
				username: 'name of ' + i_userid,
				contactInfo: 'contactInfo of ' + i_userid,
			})

			new_user.save((err, new_user) => {
				if (err) {
					console.log(err)
				} else {
					console.log ('Admin user created successfully.')
					var new_admin = new Admin({
						user: new_user._id
					})

					new_admin.save((err, new_teacher) => {
						if (err) {
							console.log(err)
						} else {
							console.log ('Admin created successfully.')
						}
					})
				}
			})	
		}
	})
}


var db_userClass_init = () => {

	for (var i = 0; i < 5; i++) {
		db_TCS_init('teacher' + i, 'pwteacher' + i, 'teacher', i)
		db_admin_init('admin' + i, 'pwadmin' + i, 'admin')
	}
}

var test = () => {
	Account.find({
		userid: 'teacher0'
	}, (err, accounts) => {
		if (err) {
			console.log(err)
		} else if (accounts.length < 1) {
			console.log('Cannot find account')
		} else if (accounts.length > 1) {
			console.log('More than one account found')
		} else {
			User.find({
				account: accounts[0]._id
			}, (err, users) => {
				if (err) {
					console.log(err)
				} else if (users.length < 1) {
					console.log('Cannot find user')
				} else if (users.length > 1) {
					console.log('More than one user found')
				} else {
					Teacher.find({
						user: user._id
					}, (err, teachers) => {
						if (err) {
							console.log(err)
						} else if (teachers.length < 1) {
							console.log('Cannot find teacher')
						} else if (teachers.length > 1) {
							console.log('More than one teacher found')
						} else {
							var teacher = teachers[0];
							teacher.office = 'On Street'
							teacher.save((err, teacher) => {
								if (err) {
									console.log(err)
								}
								
							})
						}
					})
				}
			})
		}

	})
}

module.exports = db_userClass_init






