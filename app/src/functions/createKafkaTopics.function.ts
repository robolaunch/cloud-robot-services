import kafkaAdminClient from "../clients/kafkaAdmin.client";
import kafkaTopicConfig from "../configs/kafkaTopic.config";

export default async function preparationKafka() {
  await kafkaAdminClient.connect();

  await kafkaAdminClient.createTopics(await kafkaTopicConfig());

  await kafkaAdminClient.disconnect();
}
