const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

//passport to authenticate
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;