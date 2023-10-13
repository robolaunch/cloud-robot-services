import databaseAdminClient from "../clients/databaseAdminClient";
import env from "../providers/environmentProvider";

export default async function createDatabaseSuperUser() {
  try {
    await databaseAdminClient.query(`
      CREATE ROLE ${env.rl.user}
      WITH
      LOGIN
      SUPERUSER
      CREATEDB
      CREATEROLE
      INHERIT
      NOREPLICATION
      CONNECTION LIMIT -1
      ENCRYPTED PASSWORD '${env.rl.password}';
    `);
    console.log("[POSTGRE DB] Robolaunch superuser has been created.");
  } catch (err: any) {
    if (err?.code === "42710") {
      console.log("[POSTGRE DB] Robolaunch superuser already exists.");
    } else {
      console.error("[POSTGRE DB] Error creating superuser:", err);
    }
  }
}
