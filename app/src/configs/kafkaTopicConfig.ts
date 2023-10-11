import { KafkaTopicConfig } from "../types/types";

export default function kafkaTopicConfig(): KafkaTopicConfig {
  return {
    topics: [
      {
        topic: "barcode",
        numPartitions: 1,
      },
      {
        topic: "task",
        numPartitions: 1,
      },
    ],
  };
}
