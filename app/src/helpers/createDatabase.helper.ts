import databaseAdminClient from "../clients/databaseAdmin.client";
import env from "../providers/environment.provider";
import logger from "./logger.helper";

export default async function createDatabase() {
  try {
    await databaseAdminClient.query(`
    CREATE DATABASE ${env.database.rl.name}
    WITH
    OWNER = ${env.database.rl.user}
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;`);
    logger(`[POSTGRE DB] Created ${env.database.rl.name} database`);
  } catch (err: any) {
    logger(
      err?.code === "42P04" ? "[POSTGRE DB] Database already exists" : err
    );
  }
}
