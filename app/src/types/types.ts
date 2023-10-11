import { ITopicConfig } from "kafkajs";

export type KafkaTopicConfig = {
  validateOnly?: boolean;
  waitForLeaders?: boolean;
  timeout?: number;
  topics: ITopicConfig[];
};
