import setResponse from "../helpers/setResponse.helper";
import env from "../providers/environment.provider";
import { Request, Response } from "express";
import axios from "axios";

async function get(req: Request, res: Response) {
  try {
    const { data: files } = await axios.get(
      `http://127.0.0.1:${env.robot.port}/log`
    );

    if (files) {
      setResponse(res, 200, "Data query successful", files);
    } else {
      setResponse(res, 500, "Data query failed", null);
    }
  } catch (error) {
    console.error("Error in 'get' function:", error);
    setResponse(res, 500, "An error occurred", null);
  }
}

async function getWithName(req: Request, res: Response) {
  try {
    const { data: file } = await axios.get(
      `http://127.0.0.1:${env.robot.port}/log/${req.params.name}`
    );

    if (file) {
      setResponse(res, 200, "Data query successful", file);
    } else {
      setResponse(res, 500, "Data query failed", null);
    }
  } catch (error) {
    console.error("Error in 'getWithName' function:", error);
    setResponse(res, 500, "An error occurred", null);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { data } = await axios.delete(
      `http://127.0.0.1:${env.robot.port}/log`
    );

    if (data.success) {
      setResponse(res, 200, "Data delete successfully", data);
    } else {
      setResponse(res, 500, "Data delete failed", null);
    }
  } catch (error) {
    setResponse(res, 500, "Data delete failed", null);
  }
}

async function removeWithName(req: Request, res: Response) {
  try {
    const { data } = await axios.delete(
      `http://127.0.0.1:${env.robot.port}/log/${req.params.name}`
    );

    if (data.success) {
      setResponse(res, 200, "Data delete successfully", data);
    } else {
      setResponse(res, 500, "Data delete failed", null);
    }
  } catch (error) {
    setResponse(res, 500, "Data delete failed", null);
  }
}

export default {
  get,
  getWithName,
  remove,
  removeWithName,
};
