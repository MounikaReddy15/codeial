const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

//passport to authenticate
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication,  postsController.create);

module.exports = router;