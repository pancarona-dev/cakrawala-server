import express, { Application } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.use("/api", router);
app.use((req: any, res: any, next: any) => {
  const error: any = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

export default app;
