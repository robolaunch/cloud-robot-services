import env from "../providers/environmentProvider";
import { Client } from "pg";

const adminClient = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.su.name,
  user: env.su.user,
  password: env.su.password,
});

export default adminClient;
