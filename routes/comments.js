const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

//passport to authenticate
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;