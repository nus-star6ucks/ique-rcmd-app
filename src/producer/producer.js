import { readConfigFile } from "./readConfig"
const Kafka = require("node-rdkafka")
const producer = new Kafka.Producer(readConfigFile("./client.properties"))
producer.connect()
producer.on("ready", () => {
    console.log("Kafka is ready")
})
export default producer