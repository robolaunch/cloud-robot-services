import env from "../providers/environment.provider";
import { Client } from "pg";

const databaseAdminClient = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.su.name,
  user: env.su.user,
  password: env.su.password,
});

export default databaseAdminClient;
