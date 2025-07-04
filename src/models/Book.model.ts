import { Schema, model, Document } from "mongoose";

export interface BookInterface extends Document {
  title: string;
  author: string;
  genre:
    | "fiction"
    | "non_fiction"
    | "science"
    | "history"
    | "biography"
    | "fantasy";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  imgUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookSchema = new Schema<BookInterface>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "fiction",
        "non_fiction",
        "science",
        "history",
        "biography",
        "fantasy",
      ],
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies must be a non-negative number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

export default Book;
