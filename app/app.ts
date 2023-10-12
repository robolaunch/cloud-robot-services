import express, { Request, Response, NextFunction } from "express";
import barcodeRouters from "./src/routes/barcode.routes";
import env from "./src/providers/environmentProvider";
import taskRouters from "./src/routes/task.routes";
import appRouters from "./src/routes/app.routes";
import createDB from "./src/functions/createDB";
import bodyParser from "body-parser";
import cors from "cors";
import preparationKafka from "./src/jobs/preparationKafka";
import kafkaListener from "./src/jobs/kafkaListener";

function app() {
  const app = express();

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

  app.use("/task", taskRouters);

  app.use("/", appRouters);

  const server = app.listen(env.application.port, async function () {
    await createDB();
    await preparationKafka();
    await kafkaListener();
    console.log(
      `[Cloud Robot Services] Service is running on port ${env.application.port}`
    );
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("[Cloud Robot Services] Service is shutting down");
      process.exit(0);
    });
  });
}

app();
