import databaseAdminClient from "../clients/databaseAdminClient";
import databaseClient from "../clients/databaseClient";

interface IcreateDatabaseTable {
  table_name: string;
  sql: string;
}

export default async function createDatabaseTable({
  table_name,
  sql,
}: IcreateDatabaseTable) {
  try {
    await databaseClient.query(`
    CREATE TABLE ${table_name} (
    ${sql})`);
    console.log(`[POSTGRE DB] Created '${table_name}' table`);
  } catch (err: any) {
    console.log(
      err.code === "42P07"
        ? `[POSTGRE DB] '${table_name}' Tables already exists`
        : err
    );
  }
}
