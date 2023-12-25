import { Environments } from "../types/types";
import dotenv from "dotenv";

dotenv.config();

const env: Environments = {
  database: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    su: {
      name: process.env.DATABASE_SU_NAME!,
      user: process.env.DATABASE_SU_USER!,
      password: process.env.DATABASE_SU_PASSWORD!,
    },
    rl: {
      name: process.env.DATABASE_RL_NAME!,
      user: process.env.DATABASE_RL_USER!,
      password: process.env.DATABASE_RL_PASSWORD!,
    },
  },
  kafka: {
    client_id: process.env.KAFKA_CLIENT_ID!,
    broker: process.env.KAFKA_BROKER!,
  },
  application: {
    port: parseInt(process.env.APPLICATION_PORT!),
  },
  robot: {
    host: process.env.ROBOT_HOST!,
    port: parseInt(process.env.ROBOT_PORT!),
  },
};

export default env;
