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

const sendContactForm = (req) => {
    let message = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    };
    return sendEmail(message);
};


module.exports = {sendContactForm};