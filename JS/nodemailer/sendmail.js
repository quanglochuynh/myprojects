"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "molotovco.dev@gmail.com",
      pass: process.env.MAIL_PASSWORD,
      clientId:
        "984737791982-al25ujon8c260bmvcc4qac92lnnp980o.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: "customer_service@tmc.com",
    to: "quanglochuynh@gmail.com",
    subject: "Nodemailer Project",
    text: "Hi from your nodemailer project",
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

main().catch(console.error);
