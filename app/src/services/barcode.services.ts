import databaseClient from "../clients/databaseClient";
import setResponse from "../helpers/setResponse";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  try {
    const { rows: data } = await databaseClient.query("SELECT * FROM barcodes");
    setResponse(res, 200, "Data query successful", data);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function getWithTime(req: Request, res: Response) {
  const values = [req.params.time];

  const selectQuery = "SELECT * FROM barcodes WHERE time >= $1";

  try {
    const result = await databaseClient.query(selectQuery, values);

    if (result.rowCount === 0) {
      setResponse(res, 404, "Data not found", null);
      return;
    }

    setResponse(res, 200, "Data query successful", result.rows);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function post(req: Request, res: Response) {
  try {
    const { scanner_id, time, barcode, location_x, location_y, location_z } =
      req.body;

    const { rows: data } = await databaseClient.query(
      "SELECT * FROM barcodes WHERE barcode = $1 AND time BETWEEN $2 AND $3",
      [barcode, time - 10, time + 10]
    );

    if (data.length > 0) {
      setResponse(
        res,
        400,
        `This barcode "${barcode}" already exists within the time range`
      );
      return;
    }

    await databaseClient.query(
      "INSERT INTO barcodes (scanner_id, time, barcode, location_x, location_y, location_z) VALUES ($1, $2, $3, $4, $5, $6)",
      [scanner_id, time, barcode, location_x, location_y, location_z]
    );

    setResponse(res, 200, "Data added successfully");
  } catch (error) {
    setResponse(res, 500, "Data add failed", error);
  }
}

async function remove(req: Request, res: Response) {
  try {
    databaseClient.query("INSERT INTO barcodes_log SELECT * FROM barcodes");
    databaseClient.query("DELETE FROM barcodes");
    setResponse(res, 200, "All data moved to barcodes_log successfully.");
  } catch (error) {
    setResponse(res, 500, "Error while moving data to barcodes_log.");
  }
}

export default {
  get,
  getWithTime,
  post,
  remove,
};
