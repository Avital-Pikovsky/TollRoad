// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const mongoConnection = require("../mongoDB/mongoDB");
const redisSender = require("../redis/RedisSender");
const Kafka = require("node-rdkafka");

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "js9ty9ln",
  "sasl.password": "n3jmymvhIGE-uDgJRGei0rMEUz5yk9x6",
  "debug": "generic,broker,security"
};

const prefix = "js9ty9ln-";
const topic = `${prefix}new`; // send to this topic
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