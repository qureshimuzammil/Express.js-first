const nodemailer = require('nodemailer');


// Configure nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Use your port //465 &&&  587
    secure: false, // Use TLS
    debug: true,
    auth: {
        user: '',
        pass: '',
    },
});

const sendMail = async (req, res) => {
    try {
        // Send email
        const info = await transporter.sendMail({
            from: '',
            to: '',
            subject: 'Express Mail Testing',
            text: 'This is the text content of the email.',
            html: '<p>This is the HTML content of the email.</p>',
        });

        setTimeout(sendMail, 5000)

        console.log('Email sent: ', info.messageId);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send('Error sending email');
    }
}




module.exports = {
    sendMail
}
