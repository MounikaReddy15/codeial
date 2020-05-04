const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

const passport = require('passport');

//to access controller
const usersController = require('../controllers/users_controller');

console.log('router profile loaded');


router.get('/profile', passport.checkAuthentication,  usersController.profile);
router.get('/images', usersController.images);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);


module.exports = router;