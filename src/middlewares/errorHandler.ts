import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  message: string;
  success: boolean;
  error: any;
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  let statusCode = 500;
  let message = "Internal Server Error";
  let errorDetails = err;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
  }

  const response: ErrorResponse = {
    message,
    success: false,
    error: errorDetails,
  };

  res.status(statusCode).json(response);
}

export default errorHandler;
