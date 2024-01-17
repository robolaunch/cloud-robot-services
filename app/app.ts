import preparationKafka from "./src/functions/createKafkaTopics.function";
import createDatabaseFlow from "./src/functions/createDatabase.function";
import express, { Request, Response, NextFunction, Express } from "express";
import kafkaListenerJob from "./src/jobs/kafkaListener.job";
import barcodeRouters from "./src/routes/barcode.routes";
import env from "./src/providers/environment.provider";
import topicRouters from "./src/routes/topic.routes";
import taskRouters from "./src/routes/task.routes";
import appRouters from "./src/routes/app.routes";
import logRouters from "./src/routes/log.routes";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./src/helpers/logger.helper";

async function app(): Promise<void> {
  const app: Express = express();

  app.all("/*", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.use(
    bodyParser.json(),
    cors({
      origin: "*",
    })
  );

  app.use("/barcode", barcodeRouters);

  app.use("/topic", topicRouters);

  app.use("/task", taskRouters);

  app.use("/log", logRouters);

  app.use("/", appRouters);

  const server = app.listen(env.application.port, "0.0.0.0", async function () {
    await createDatabaseFlow();
    await preparationKafka();
    await kafkaListenerJob();
    logger(
      `[Cloud Robot Services] Service is running on port ${env.application.port}`
    );
  });

  process.on("SIGINT", () => {
    server.close(() => {
      logger("[Cloud Robot Services] Service is shutting down");
      process.exit(0);
    });
  });
}

app();
