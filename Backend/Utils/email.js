const nodemailer = require('nodemailer');

const sendEmail = async (option) => { 
    // this example is using mailtrap but use gmail
    // CREATE TRANSPORT
    const transporter = nodemailer.createTransport({
        // service: process.env.EMAIL_HOST,
        host: process.env.EMAIL_HOST, // for mailtrap
        port:process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            // password: process.env.EMAIL_PASSWORD
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // DEFINE EMAIL OPTIONS

    const emailOptions = {
        from: 'Abdi Bacha <abdibacha67@gmail.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendEmail(emailOptions);
 }

 module.exports = sendEmail;
//  exports.sendEmail = sendEmail;
