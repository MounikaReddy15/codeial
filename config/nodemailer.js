const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// transporter defines the configuaration using which we send emails
let transporter = nodemailer.createTransport(env.smtp);

 // define we will be using ejs
 // relativePath from where the mail is being sent
 let renderTemplate = (data, relativePath) => {
     let mailHTML;
     ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if(err) {console.log('error in rendering template', err); return; }

            mailHTML = template;
        }
     )

       return mailHTML;
 }

  module.exports = {
      transporter: transporter,
      renderTemplate: renderTemplate
  }