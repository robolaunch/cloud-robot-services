import databaseAdminClient from "../clients/databaseAdminClient";
import env from "../providers/environmentProvider";

export default async function createDatabaseSuperUser() {
  try {
    await databaseAdminClient.query(`
    CREATE ROLE ${env.rl.user} WITH
    LOGIN
    SUPERUSER
    CREATEDB
    CREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '${env.rl.password}';`);
    console.log("[POSTGRE DB] Created robolaunch superuser");
  } catch (err: any) {
    console.log(
      err?.code === "42710" ? "[POSTGRE DB] Superuser already exists" : err
    );
  }
}
