import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

  const server = app.listen(8077, function () {
    console.log(`[Cloud Robot Services] Service is running on port 8077`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("[Cloud Robot Services] Service is shutting down");
      process.exit(0);
    });
  });
}

app();
