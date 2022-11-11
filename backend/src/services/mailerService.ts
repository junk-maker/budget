import SMTPTransport from 'nodemailer';
import {Message} from '../interfaces/interfaces';

export class MailService {
    private transporter: SMTPTransport.Transporter;
    
    constructor() {
        this.transporter = SMTPTransport.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        } as SMTPTransport.SendMailOptions);
    };

    async sendEmail(message: Message): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Message from ${message.email}`,
            html: message.html,
        });
    };
};

export default new MailService();