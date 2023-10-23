import { KafkaConfig } from "kafkajs";
import env from "../providers/environment.provider";

export default function kafkaConfig(): KafkaConfig {
  return {
    clientId: env.kafka.client_id,
    brokers: [env.kafka.broker],
    retry: {
      retries: 1000000,
    },
  };
}
