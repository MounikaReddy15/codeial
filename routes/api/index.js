const express = require('express');


//express.Router helps in seperating routers and controllers
const router = express.Router();

router.use('/v1', require('./v1'));

module.exports = router;