import createDatabaseSuperUser from "../helpers/createDatabaseSuperUser.helper";
import { createDatabaseTables } from "../helpers/createDatabaseTables.helper";
import createDatabase from "../helpers/createDatabase.helper";
import databaseAdminClient from "../clients/databaseAdmin.client";
import databaseClient from "../clients/database.client";
import logger from "../helpers/logger.helper";

export default async function dbCreateFlow() {
  try {
    await databaseAdminClient.connect();

    await createDatabaseSuperUser();
    await createDatabase();
    await databaseClient.connect();

    await createDatabaseTables();
  } catch (error) {
    logger("[POSTGRE DB] Error connecting/creating database");
    throw error;
  }
}
