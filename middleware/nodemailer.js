// const nodemailer = require("nodemailer");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.AUTH,
  },
});

function emailSend(dataUser, message, link) {
  if (link) {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: process.env.EMAIL,
        to: dataUser.email,
        subject: `Hallo ${dataUser.username}`,
        html: `<div style="font-family: Helvetica;"><h3>Link Reset password  ${link} </h3><br>Thanks ${dataUser.username}</div>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("Error!", err);
        } else {
          console.log(`Email sent: ${dataUser.email}`);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: process.env.EMAIL,
        to: dataUser.email,
        subject: `Hallo ${dataUser.username}`,
        html: `<div style="font-family: Helvetica;"><h3>${message}</h3><br>Thanks ${dataUser.username}</div>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("Error!", err);
        } else {
          console.log(`Email sent: ${dataUser.email}`);
        }
      });
    });
  }
}

module.exports = emailSend;
