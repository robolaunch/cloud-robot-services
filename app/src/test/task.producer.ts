import kafkaClient from "../clients/kafkaClient";

(async () => {
  const producer = kafkaClient.producer();

  await producer.connect();
  await producer.send({
    topic: "task",
    messages: [
      {
        value: JSON.stringify({
          task_id: "A1B2C3D4E5",
          task_name: "Task 1",
          task_json: JSON.stringify({
            isActive: true,
            waypoints: [1, 2, 3],
          }),
        }),
      },
    ],
  });
  await producer.disconnect();
})();
