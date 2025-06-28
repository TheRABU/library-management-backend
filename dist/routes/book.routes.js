import express from "express";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBook, } from "../controllers/book.controller.js";
const bookRouter = express.Router();
bookRouter.post("/books", createBook);
bookRouter.get("/books", getAllBooks);
bookRouter.get("/books/:bookId", getBookById);
bookRouter.put("/books/:bookId", updateBook);
bookRouter.delete("/books/:bookId", deleteBookById);
export default bookRouter;
