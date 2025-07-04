import express from "express";
import {
  borrowBook,
  getAllBorrowRecords,
  getBorrowedBooksSummary,
} from "../controllers/borrow.controller.js";
const borrowRouter = express.Router();

borrowRouter.post("/borrow", borrowBook);
borrowRouter.get("/borrow-summary", getBorrowedBooksSummary);
borrowRouter.get("/borrows", getAllBorrowRecords);

export default borrowRouter;
