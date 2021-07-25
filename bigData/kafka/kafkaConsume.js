// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const mongoConnection = require("../mongoDB/mongoDB");
const redisSender = require("../redis/RedisSender");
const Kafka = require("node-rdkafka");
const bigML = require("../bigML/bigML");


const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-01.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "6k4q1urw",
  "sasl.password": "tZPUr00GrIrA3mzh9M9TWX9m_VjJ-Png",
  "debug": "generic,broker,security"
};

const prefix = "6k4q1urw-";
const topic = `${prefix}test`; // send to this topic
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);
//const prefix = process.env.CLOUDKARAFKA_USERNAME;

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
  // console.log("data - consume:");
  // console.log(m.value.toString());
  mongoConnection.ConnectTodb(m.value.toString(), 1);
  redisSender.sendDataToRedis(m.value.toString());
  bigML.bigmlprediction(m.value.toString());

});
consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
  // console.log(log);
});
consumer.connect();