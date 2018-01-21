const User = require('./models/User')

var db_init = () => {
	var student = new User({
		username: 'studentname',
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
		username: 'teachername',
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
}

module.export = db_init