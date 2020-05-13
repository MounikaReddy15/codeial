const nodeMailer =  require('../config/nodemailer');

// create a func which will send mail
// newComment = func{}
// module.exports = newc
// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newcomment mailer', comment);

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    // send an email
    nodeMailer.transporter.sendMail({
        from: 'mona',
        // sending to the person who commented
        to: comment.user.email,
        subject: 'new comment published',
        html: htmlString
    }, (err, info) => {
        // info carries the info'tn about the req that has been sent
        if(err) {console.log('error in sending mail', err);  return; }

        console.log('Message Sent', info);
        return;
    })
}