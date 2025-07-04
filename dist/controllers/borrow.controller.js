import Book from "../models/Book.model.js";
import Borrow from "../models/Borrow.model.js";
export const borrowBook = async (req, res, next) => {
    try {
        const { bookId, title, dueDate, quantity } = req.body;
        console.log(bookId, title, dueDate, quantity);
        if (!bookId || !quantity || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Please provide book ID, quantity, and due date",
            });
        }
        // if (!mongoose.Types.ObjectId.isValid(book)) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Invalid book ID format",
        //   });
        // }
        const foundBook = await Book.findOne({ title: title.trim() });
        console.log(foundBook);
        if (!foundBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        if (foundBook.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
        }
        // update copies
        foundBook.copies -= quantity;
        if (foundBook.copies === 0) {
            foundBook.available = false;
        }
        await foundBook.save();
        // Create borrow record
        const borrow = await Borrow.create({
            bookId: foundBook._id,
            title: foundBook.title,
            quantity,
            dueDate,
        });
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getBorrowedBooksSummary = async (req, res, next) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllBorrowRecords = async (req, res) => {
    try {
        const records = await Borrow.find();
        if (!records) {
            console.log("Could not find any record see at getAllBorrowRecords::");
            return;
        }
        res.status(200).json({
            success: true,
            message: "Retrieved data successfully",
            data: records,
        });
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
