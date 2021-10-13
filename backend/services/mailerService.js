const nodemailer = require('nodemailer');

const sendEmail = message => {
    return new Promise((res, rej) => {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        transporter.sendMail(message, (err, info) => {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        });
    });
};

module.exports = {sendEmail};