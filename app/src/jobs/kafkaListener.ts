import axios from "axios";
import kafkaClient from "../clients/kafkaClient";
import { Barcode } from "../types/types";
import env from "../providers/environmentProvider";
import { EachMessagePayload } from "kafkajs";

export default async function kafkaListener() {
  const consumer = kafkaClient.consumer({
    groupId: "barcode-group",
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "barcode" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (message.value) {
        const data: Barcode = JSON.parse(message.value.toString());

        axios.post(`http://127.0.0.1:${env.application.port}/barcode`, {
          time: data.time,
          scannerId: data.scanner_id,
          barcode: data.barcode,
          location_x: data.location_x,
          location_y: data.location_y,
          location_z: data.location_z,
        });
      }
    },
  });
}
