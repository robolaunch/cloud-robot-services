import { Kafka } from "kafkajs";
import kafkaConfig from "../configs/kafkaConfig";

const kafkaClient = new Kafka(kafkaConfig());

export default kafkaClient;
