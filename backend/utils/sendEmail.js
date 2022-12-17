let nodemailer = require("nodemailer");
const sendEmail = async(options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MY_EMAIL,
            pass: process.env.SMPT_MY_PASSWORDS,
        },
    });
    const mailOptions = {
        from: process.env.SMPT_MY_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;