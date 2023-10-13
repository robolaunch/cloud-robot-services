import axios from "axios";
import { Consumer, EachMessagePayload } from "kafkajs";
import { Barcode } from "../types/types";
import env from "../providers/environmentProvider";

async function barcode(consumer: Consumer) {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (message.value) {
        const data: Barcode = JSON.parse(message.value.toString());

        axios.post(`http://127.0.0.1:${env.application.port}/barcode`, {
          time: data.time,
          scannerId: data.scanner_id,
          barcode: data.barcode,
          location_x: data.location_x,
          location_z: data.location_z,
        });
      }
    },
  });
}

async function task(consumer: Consumer) {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (message.value) {
        console.log("kafkaTask", message.value.toString());
      }
    },
  });
}

async function topic(consumer: Consumer) {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (message.value) {
        console.log("kafkaTopic", message.value.toString());
      }
    },
  });
}

export default {
  barcode,
  task,
  topic,
};
