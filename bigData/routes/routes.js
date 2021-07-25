const path = require('path');
const RedisR = require('../redis/RedisReciver');
const bigML = require('../bigML/bigML');

const express = require('express');
const router = express.Router();


router.get('/', RedisR.getcars);
router.get('/bigml',bigML.showMatrix);


module.exports = router;