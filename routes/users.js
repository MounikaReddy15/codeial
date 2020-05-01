const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

//to access controller
const usersController = require('../controllers/users_controller');

console.log('router profile loaded');


router.get('/profile', usersController.profile);
router.get('/images', usersController.images);
module.exports = router;