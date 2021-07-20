const path = require('path');
const RedisR = require('../redis/RedisReciver');
const express = require('express');
const router = express.Router();


router.get('/dashboard', RedisR.getcars);


module.exports = router;