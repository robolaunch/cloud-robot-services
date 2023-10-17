import createDatabaseTable from "./createDatabaseTable.helper";

export async function createDatabaseTables() {
  await createDatabaseTable({
    table_name: "barcodes",
    sql: `
    time INTEGER,
    scanner_id INTEGER,
    barcode TEXT,
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT`,
  });

  await createDatabaseTable({
    table_name: "barcodes_log",
    sql: `
    time INTEGER,
    scanner_id INTEGER,
    barcode TEXT,
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT`,
  });

  await createDatabaseTable({
    table_name: "tasks",
    sql: `
    task_id TEXT,
    task_name TEXT,
    task_json TEXT`,
  });

  await createDatabaseTable({
    table_name: "tasks_log",
    sql: `
    task_id TEXT,
    task_name TEXT,
    task_json TEXT`,
  });

  await createDatabaseTable({
    table_name: "topics",
    sql: `
    name TEXT,
    type TEXT
    `,
  });

  await createDatabaseTable({
    table_name: "topics_log",
    sql: `
    name TEXT,
    type TEXT
    `,
  });
}
