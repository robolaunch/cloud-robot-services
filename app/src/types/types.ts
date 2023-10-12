import { ITopicConfig } from "kafkajs";

export type KafkaTopicConfig = {
  validateOnly?: boolean;
  waitForLeaders?: boolean;
  timeout?: number;
  topics: ITopicConfig[];
};

export type Environments = {
  database: {
    host: string;
    port: number;
  };
  su: {
    name: string;
    user: string;
    password: string;
  };
  rl: {
    name: string;
    user: string;
    password: string;
  };
  application: {
    port: number;
  };
};
