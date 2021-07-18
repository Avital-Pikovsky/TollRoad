const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 3000
const simu = require('./simu/simulator');
const fetch = require('./mongoDB/fetchMongo');

//------------ kafka------------
const kafka = require('./kafka/kafkaProduce');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));
// app.get('/send', (req, res) => res.render('sender'));

app.get('/dashboard', (req, res) => {
    var cards=["Borrowed","Annual Profit","Lead Conversion","Average Income",];
  res.render("./pages/index",{cards:cards});
})
app.use('/fetch', fetch.fetchAll);

//------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    // socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    socket.on("callDetails", (msg) => { console.log(msg);kafka.publish(msg) });
});


//------------------- kafka -----------
/* Kafka Producer Configuration */
//const myProducer = require('./simulator');
//myProducer.GenerateData(kafka);
//
//const client1 = new kafka.KafkaClient({kafkaHost: "localhost:9092"});





//------------------------------------


server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


