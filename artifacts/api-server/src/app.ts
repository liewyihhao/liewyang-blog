import express, { Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";

const app = express();

app.use(
  pinoHttp()
);

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});
