const path = require('path');
const express = require('express');
const router = express.Router();
const RedisR = require('../redis/RedisReciver');
const bigML = require('../bigML/bigML');
const  mongoFetch = require('../mongoDB/fetchMongo');


router.get('/', RedisR.getcars);
router.get('/bigml',bigML.showMatrix);
router.get('/fetch', mongoFetch.fetchAll);

module.exports = router;