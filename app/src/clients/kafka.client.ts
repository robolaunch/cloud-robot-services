import { Kafka } from "kafkajs";
import kafkaConfig from "../configs/kafka.config";

const kafkaClient = new Kafka(kafkaConfig());

export default kafkaClient;
