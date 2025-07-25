import cors from "cors";
import express, { type Request, type Response } from "express";

import { errorConverter, errorHandler } from "./middlewares/error.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.json("Hello, World!");
});

app.use(errorConverter);
app.use(errorHandler);
