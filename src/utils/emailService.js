import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your-brevo-smtp-user',
        pass: 'your-brevo-smtp-password'
    }
});

export const sendEmail = async (email, subject, message, attachments) => {
    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: subject,
        text: message,
        attachments: attachments || []
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
};
