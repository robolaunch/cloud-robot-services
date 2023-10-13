import topicServices from "../services/topic.services";
import express from "express";

const router = express.Router();

router.get("/", topicServices.get);

router.post("/", topicServices.post);

router.delete("/:name", topicServices.remove);

export default router;
