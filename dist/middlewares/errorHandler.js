function errorHandler(err, req, res, next) {
    console.error(err);
    let statusCode = 500;
    let message = "Internal Server Error";
    let errorDetails = err;
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
    }
    const response = {
        message,
        success: false,
        error: errorDetails,
    };
    res.status(statusCode).json(response);
}
export default errorHandler;
