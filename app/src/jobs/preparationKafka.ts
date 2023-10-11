import kafkaAdminClient from "../clients/kafkaAdminClient";
import kafkaTopicConfig from "../configs/kafkaTopicConfig";

export default async function preparationKafka() {
  await kafkaAdminClient.connect();

  await kafkaAdminClient.createTopics(kafkaTopicConfig());
}
