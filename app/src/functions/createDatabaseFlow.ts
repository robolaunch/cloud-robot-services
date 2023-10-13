import createDatabaseSuperUser from "../helpers/createDatabaseSuperUser";
import { createDatabaseTables } from "../helpers/createDatabaseTables";
import createDatabase from "../helpers/createDatabase";

export default async function dbCreateFlow() {
  try {
    await createDatabaseSuperUser();
    await createDatabase();
    await createDatabaseTables();
  } catch (error) {
    console.log("[POSTGRE DB] Error connecting/creating database");
    throw error;
  }
}
