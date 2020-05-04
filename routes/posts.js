const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

const postsController = require('../controllers/posts_controller');

router.post('/create',postsController.create);

module.exports = router;