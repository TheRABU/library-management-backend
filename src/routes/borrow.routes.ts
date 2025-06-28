import express from "express";
import {
  borrowBook,
  getBorrowedBooksSummary,
} from "../controllers/borrow.controller.js";
const borrowRouter = express.Router();

borrowRouter.post("/borrow", borrowBook);
borrowRouter.get("/borrow", getBorrowedBooksSummary);

export default borrowRouter;
