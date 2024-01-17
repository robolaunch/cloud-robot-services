import databaseClient from "../clients/database.client";
import { databaseTables } from "../global/variables";
import logger from "./logger.helper";

interface IcreateDatabaseTable {
  table_name: string;
  sql: string;
}

export default async function createDatabaseTable({
  table_name,
  sql,
}: IcreateDatabaseTable) {
  try {
    const { rows: databaseTablesRow } = await databaseClient.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
    );

    const tables = databaseTablesRow.map((row: any) => row.table_name);

    if (tables.includes(table_name)) {
      logger(`[POSTGRE DB] '${table_name}' Tables already exists`);

      databaseTables.includes(table_name)
        ? null
        : databaseTables.push(table_name);

      return;
    }

    await databaseClient.query(`
    CREATE TABLE ${table_name} (
    ${sql})`);
    logger(`[POSTGRE DB] Created '${table_name}' table`);

    databaseTables.push(table_name);
  } catch (err: any) {
    logger(
      err.code === "42P07"
        ? `[POSTGRE DB] '${table_name}' Tables already exists`
        : err
    );
  }
}
