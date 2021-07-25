const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 3000

//------------ routes------------
const CarsRoutes = require('./routes/routes');

//------------ simulator------------

const simu = require('./simu/simulator');

//------------ kafka------------
const kafkaConsume = require('./kafka/kafkaConsume');
const kafka = require('./kafka/kafkaProduce');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(CarsRoutes);

server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


