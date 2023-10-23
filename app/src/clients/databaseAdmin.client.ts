import env from "../providers/environment.provider";
import { Client } from "pg";

const databaseAdminClient = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.database.su.name,
  user: env.database.su.user,
  password: env.database.su.password,
});

export default databaseAdminClient;
