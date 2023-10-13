import kafkaController from "../controllers/kafka.controller";
import { KafkaTopicConfig } from "../types/types";
import { ITopicConfig } from "kafkajs";
import kafkaTopicConfig from "../configs/kafkaTopicConfig";
import kafkaClient from "../clients/kafkaClient";

export default async function kafkaListenerJob() {
  await kafkaTopicConfig().then(async (data: KafkaTopicConfig) => {
    data.topics.map(async (topic: ITopicConfig) => {
      const consumer = kafkaClient.consumer({
        groupId: `${topic.topic}-group`,
      });

      await consumer.connect();
      await consumer.subscribe({ topic: topic.topic });

      switch (topic.topic) {
        case "barcode":
          kafkaController.barcode(consumer);
          break;
        case "task":
          kafkaController.task(consumer);
          break;
        case "topic":
          kafkaController.topic(consumer);
          break;
      }
    });
  });
}
