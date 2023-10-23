import env from "../providers/environment.provider";
import { Client } from "pg";

const client = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.database.rl.name,
  user: env.database.rl.user,
  password: env.database.rl.password,
});

export default client;
