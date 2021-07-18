const mongos = require('../mongoDB/mongoDB');
const bigml = require('bigml');

var cars;
module.exports.fetchAll = () => {
    cars = mongos.ConnectTodb(null,  2);
}


