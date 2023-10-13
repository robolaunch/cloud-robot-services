import axios from "axios";
import { Consumer, EachMessagePayload } from "kafkajs";
import { Barcode } from "../types/types";
import env from "../providers/environmentProvider";
import createDatabaseTable from "../helpers/createDatabaseTable";
import { databaseTables } from "../global/variables";
import databaseClient from "../clients/databaseClient";

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
        const data = JSON.parse(message.value.toString());

        if (!databaseTables.includes(data.name)) {
          await createDatabaseTable({
            table_name: data.name,
            sql: `
    time INTEGER,
    name TEXT,
    type TEXT,
    data TEXT
    `,
          });
        }

        console.log("kafkaTopic", message.value.toString());

        databaseClient.query(
          `
        INSERT INTO ${data.name} (time, name, type, data) VALUES ($1, $2, $3, $4)`,
          [data.time, data.name, data.type, data.data]
        );
      }
    },
  });
}

export default {
  barcode,
  task,
  topic,
};
