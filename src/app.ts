import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import bookRouter from "./routes/book.routes.js";
import borrowRouter from "./routes/borrow.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(errorHandler);

// routes
app.use("/api", bookRouter);
app.use("/api", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server running in the app successfully!",
  });
});

export default app;
