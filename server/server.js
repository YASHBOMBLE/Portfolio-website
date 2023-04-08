import { createTransport } from 'nodemailer';


let mailTransporter = createTransport({
	service: 'gmail',
	auth: {
		user: 'yashbomble001@gmail.com',
		pass: 'EB1C926C882E35A1E012BC9F05DF38C3DB3A'
	},
    port: 2525,
    host: 'smtp.elasticemail.com'
});

let mailDetails = {
	from: 'yashbomble001@gmail.com',
	to: 'yashbomble@gmail.com',
	subject: 'Test mail',
	text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
