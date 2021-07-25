// https://www.cloudkarafka.com/

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const simu = require('../simu/simulator');



// const kafkaConf = {
//   "group.id": "cloudkarafka-example",
//   "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
//   "socket.keepalive.enable": true,
//   "security.protocol": "SASL_SSL",
//   "sasl.mechanisms": "SCRAM-SHA-256",
//   "sasl.username": "js9ty9ln",
//   "sasl.password": "n3jmymvhIGE-uDgJRGei0rMEUz5yk9x6",
//   "debug": "generic,broker,security"
// };

//------------ Kafka details to connection------------
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

//------------ Produce data------------
producer.on("ready", function(arg) {
  console.log(`producer is ready.`);
  simu.simulator(publish);
});
producer.connect();

function publish(msg)
{   
  m=JSON.stringify(msg);
  producer.produce(topic, -1, genMessage(m), uuid.v4());  //Send to KAFKA
  //producer.disconnect();   
}