import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

export const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  req.log = logger.child({
    method: req.method,
    url: req.url?.split("?")[0],
  });
  const start = Date.now();
  res.on("finish", () => {
    req.log.info({ statusCode: res.statusCode, duration: Date.now() - start }, "request completed");
  });
  req.log.info("incoming request");
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
