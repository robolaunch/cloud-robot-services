import kafkaClient from "../clients/kafka.client";

(async () => {
  const producer = kafkaClient.producer();

  await producer.connect();
  await producer.send({
    topic: "topic",
    messages: [
      {
        value: JSON.stringify({
          time: Math.floor(+new Date() / 1000),
          name: "battery",
          type: "std_msgs/String",
          data: "100",
        }),
      },
    ],
  });
  await producer.disconnect();
})();
