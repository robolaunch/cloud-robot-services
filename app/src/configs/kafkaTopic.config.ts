import { KafkaTopicConfig } from "../types/types";

export default async function kafkaTopicConfig(): Promise<KafkaTopicConfig> {
  return {
    topics: [
      {
        topic: "barcode",
        numPartitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "task",
        numPartitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "topic",
        numPartitions: 1,
        replicationFactor: 1,
      },
    ],
  };
}
