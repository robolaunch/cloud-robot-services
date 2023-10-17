import databaseClient from "../clients/database.client";
import setResponse from "../helpers/setResponse.helper";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  try {
    const { rows: data } = await databaseClient.query("SELECT * FROM tasks");
    setResponse(res, 200, "Data query successful", data);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function post(req: Request, res: Response) {
  try {
    await databaseClient.query(
      "INSERT INTO tasks (task_id, task_name, task_json) VALUES ($1, $2, $3)",
      [req.body.task_id, req.body.task_name, req.body.task_json]
    );
    setResponse(res, 200, "Data added successfully");
  } catch (error) {
    setResponse(res, 500, "Data add failed", error);
  }
}

async function put(req: Request, res: Response) {
  try {
    await databaseClient.query(
      "UPDATE tasks SET task_name = $1, task_json = $2 WHERE task_id = $3",
      [req.body.task_name, req.body.task_json, req.params.task_id]
    );
    setResponse(res, 200, "Data update successfully");
  } catch (error) {
    setResponse(res, 500, "Data update failed", error);
  }
}

async function remove(req: Request, res: Response) {
  try {
    await databaseClient.query("DELETE FROM tasks WHERE task_id = $1", [
      req.params.task_id,
    ]);
    setResponse(res, 200, "Data delete successfully");
  } catch (error) {
    setResponse(res, 500, "Data delete failed", error);
  }
}

export default {
  get,
  post,
  put,
  remove,
};
