const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

// every worker has a process func, for every q entry it runs
// first arg is type of q i.e., name of Q
// this has a func which takes arg job(what it needs to do)
// 1. call mailer, 2.data
// process func calls the mailer
queue.process('emails', function(job, done) {
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
})