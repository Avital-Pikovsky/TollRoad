const mongos = require('../mongoDB/mongoDB');
const bigml = require('bigml');

//------------ Fetch data from mongoDB to create csv file with the data------------
var cars;
module.exports.fetchAll = () => {
    cars = mongos.ConnectTodb(null,  2); //fetch data from mongoDB
}


