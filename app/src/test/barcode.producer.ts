import kafkaClient from "../clients/kafka.client";

(async () => {
  const producer = kafkaClient.producer();

  await producer.connect();
  await producer.send({
    topic: "barcode",
    messages: [
      {
        value: JSON.stringify({
          time: Math.floor(+new Date() / 1000),
          scanner_id: 1,
          barcode: "1234567890",
          location_x: 1.1,
          location_y: 2.2,
          location_z: 3.3,
        }),
      },
    ],
  });
  await producer.disconnect();
})();
