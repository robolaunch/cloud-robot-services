import databaseClient from "../clients/databaseClient";
import setResponse from "../helpers/setResponse";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  try {
    const { rows: data } = await databaseClient.query("SELECT * FROM topics");
    setResponse(res, 200, "Data query successful", data);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function post(req: Request, res: Response) {
  try {
    const { name, type } = req.body;

    const { rows: data } = await databaseClient.query(
      "SELECT * FROM topics WHERE name = $1",
      [name]
    );

    if (data.length > 0) {
      setResponse(res, 409, "Record with the same name already exists");
      return;
    }

    await databaseClient.query(
      "INSERT INTO topics (name, type) VALUES ($1, $2)",
      [name, type]
    );
    setResponse(res, 201, "Record inserted successfully");
  } catch (error) {
    setResponse(res, 500, "Error while processing the request", error);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { name } = req.params;

    const { rows: data } = await databaseClient.query(
      "SELECT * FROM topics WHERE name = $1",
      [name]
    );

    if (data.length === 0) {
      setResponse(res, 404, "Record not found");
      return;
    }

    await databaseClient.query(
      "INSERT INTO topics_log (name, type) VALUES ($1, $2)",
      [data[0].name, data[0].type]
    );
    await databaseClient.query("DELETE FROM topics WHERE name = $1", [name]);

    setResponse(
      res,
      200,
      "Record moved to topics_log and deleted from topics successfully"
    );
  } catch (error) {
    setResponse(res, 500, "Error while processing the request", error);
  }
}

export default {
  get,
  post,
  remove,
};
