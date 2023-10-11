import { KafkaConfig } from "kafkajs";

export default function kafkaConfig(): KafkaConfig {
  return {
    clientId: "robolaunch",
    brokers: ["localhost:9092"],
  };
}
