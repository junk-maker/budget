import SMTPTransport from 'nodemailer';
import EmailOptions from '@/utils/interfaces/email.interface';

class EmailService {
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

    async sendingEmail(opts: EmailOptions): Promise<void> {
        let message = (type: string): string | undefined => {
            return {
                register: `
                    <h3>Hello ${opts.name}</h3>
                    <p>Thank you for registering in our application. Very grateful! The final step lies ahead ...</p>
                    <p>To activate your account, follow this link: 
                    <a target="_" href=${opts.url}>${opts.url}</a>
                    </p>
                    <p>Best wishes</p>
                    <p>Your development team</p>
                `,
                'password-recovery': `
                    <h1>You requested a password reset</h1>
                    <p>Please make a request for placement at the following link:</p>
                    <a href=${opts.url}>${opts.url}</a>
                `,
                'verify-email': `
                    <p>Resend activation message</p>
                    <p>To activate your account, follow this link:  
                    <a target="_" href=${opts.url}>${opts.url}</a
                    </p>
                    <p>Best wishes</p>
                    <p>Your development team</p>
                `, 
                'send-message': opts.text, 
            }[type];
        };

        let sending = await this.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Message from ${opts.email}`,
            html: message(opts.type),
        });

        return sending;
    };
};

export default EmailService;