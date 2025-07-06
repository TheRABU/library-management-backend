import { Request, Response, NextFunction } from "express";
import Book from "../models/Book.model.js";
import mongoose from "mongoose";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const addBooksInBulk = async (req: Request, res: Response) => {
  try {
    const result = await Book.insertMany(req.body);
    res.status(201).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).json({ message: errorMessage });
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "20",
    } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter.toString().toLowerCase();
    }

    // Sort direction
    const sortOrder = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
      .sort({ [sortBy.toString()]: sortOrder })
      .limit(parseInt(limit.toString()));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Invalid book ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book's data found successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const updatedData = req.body;
    const { title, author, genre, description, quantity } = updatedData;
    if (!title && !author && !genre && !description && !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "No title, author, genre, description, quantity found to be updated!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
        error: "Invalid ObjectId",
      });
    }

    const book = await Book.findOne({ _id: bookId });
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book not found in database",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book with that ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Could not find the book in database with that ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book Deleted Successfully!",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
