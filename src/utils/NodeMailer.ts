// import * as nodeMailer from 'nodemailer';
// import * as SendGrid from 'nodemailer-sendgrid-transport';

// export class NodeMailer {
//     private static initiateTransport() {
//         return nodeMailer.createTransport(SendGrid({
//             auth: {
//                 api_key: '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'//The key can be found in your node js notes for future references
//             }
//         }));
//     }

//     static sendMail(data: {to: [string], subject: string, html: string}): Promise<any> {
//         return NodeMailer.initiateTransport().sendMail({
//             from: 'technyks@gmail.com',
//             to: data.to,
//             subject: data.subject,
//             html: data.html
//         });
//     }
// }
import * as sgMail from '@sendgrid/mail';

export class NodeMailer {
    private static initiateTransport() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    static async sendMail(data: { to: string[], subject: string, html: string }): Promise<void> {
        NodeMailer.initiateTransport();

        const msg = {
            from: 'arnold.mabope@gmail.com', // Replace with a verified sender email
            to: data.to,
            subject: data.subject,
            html: data.html
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}