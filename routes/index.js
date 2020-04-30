// this index.js is entry point to all the routes

const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

//to access controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);

//it has to be exported to used in main index.js
module.exports = router;