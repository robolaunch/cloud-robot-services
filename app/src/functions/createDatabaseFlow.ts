import createDatabaseSuperUser from "../helpers/createDatabaseSuperUser";
import { createDatabaseTables } from "../helpers/createDatabaseTables";
import createDatabase from "../helpers/createDatabase";
import databaseAdminClient from "../clients/databaseAdminClient";
import databaseClient from "../clients/databaseClient";

export default async function dbCreateFlow() {
  try {
    await databaseAdminClient.connect();

    await createDatabaseSuperUser();
    await createDatabase();
    await databaseClient.connect();

    await createDatabaseTables();
  } catch (error) {
    console.log("[POSTGRE DB] Error connecting/creating database");
    throw error;
  }
}
