const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Road6:daravital12345@cluster0.slp0a.mongodb.net/ariel2?retryWrites=true&w=majority";

module.exports.sendData = function(cars){
    var myobj = JSON.parse(cars)
    
MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true } ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("Road6");
    
    dbo.collection("cars").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("one car inserted");
      db.close();
    });
  });
}