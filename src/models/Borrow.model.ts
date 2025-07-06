import { Schema, model } from "mongoose";

const borrowSchema = new Schema(
  {
    bookId: {
      type: String,
      // ref: "Book",
      required: [true, "BookId is required"],
    },
    bookImg: {
      type: String,
    },
    title: {
      type: String,
    },
    isbn: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  { timestamps: true }
);

const Borrow = model("Borrow", borrowSchema);

export default Borrow;
