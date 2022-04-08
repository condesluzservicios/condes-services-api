const nodemailer = require('nodemailer');

const connectMailer = async ({ email_dest, subject, format }) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_USER, // generated ethereal user
        pass: process.env.MAILER_PASSWORD, // generated ethereal password
      },
    });

    const mailerOptions = {
      from: `${process.env.MAILER_USER}`, // sender address
      to: email_dest ? email_dest : process.env.MAILER_USER, // list of receivers
      subject: subject, // Subject line
      text: '', // plain text body
      html: format, // html body
    };

    let info = await transporter.sendMail(mailerOptions);
    return info;
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.log('error al enviar correo', error);
  }
};

module.exports = connectMailer;
