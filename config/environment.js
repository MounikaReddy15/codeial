// it will contain evnv's development and production

// since we write to the file system
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// where the log will be stored
const logDirectory = path.join(__dirname, '../production_logs');
// if production logs already exists or it shud be created
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// accesslog as in user is accessing the website

// const accessLogStream = rfs('access.log', {
const accessLogStream =    rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});
   

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        // 587(tls, which is the highest form of security)
        post: '587',
        secure: false,
         // authentication using which we send emails
        auth: {
            user: 'mounikagonae@gmail.com',
            pass: '{123456789}'
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    },
    google_client_id: '1053336096562-h9mstv96ifkpah5ck9ovpdj9svf179e0.apps.googleusercontent.com',
    google_client_secret: 'uKenCLkReyZSbnwFPYCMJl26',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',
    morgan: {
        node: 'dev',
        // for storing logs
        options: {stream: accessLogStream}
    }
}


const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        // 587(tls, which is the highest form of security)
        post: '587',
        secure: false,
         // authentication using which we send emails
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        node: 'combined',
        options: {stream: accessLogStream}
    }
}

// module.exports = eval(process.env.NODE_ENV == undefined ? development : eval(process.env.NODE_ENV));
// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);

module.exports = eval(process.env.CODEIAL_ENVIRONMENT == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT));