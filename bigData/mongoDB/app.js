const express = require('express')
const dataModel = require('./dataModel')

const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var bodyParser = require('body-parser')
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile('orders.html', { root: __dirname + "/public" } );
})

app.get('/dashboard', (req, res) => {
  dataModel.ReadOrders((card)=>{res.render("./pages/index",{card:card})});
 
})


app.post('/getOrder', (req, res) => {
    dataModel.CreateOrder(req.body.name,req.body.orderNumber,req.body.product,req.body.quantity,(data)=>{io.emit('new data',data);});
      
    res.end(`order of ${req.body.product} was saved`);
})



io.on('connection', (socket) => {
  socket.on('new data1', (msg) => {
    console.log(msg);
    io.emit('new data', msg);
  });
});


server.listen(port, () => {
  console.log(`Example app listening at http://localhost: ${port}...`)
})