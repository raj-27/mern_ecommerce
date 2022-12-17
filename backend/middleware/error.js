const ErrorHandler = require("../utils/errorhandler");

exports.errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Inter Server Error";
    // wrong id error
    if (err.name === "CastError") {
        const message = `resource not found ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    // wrong duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    // wrong jwt token
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid,Try again`;
        err = new ErrorHandler(message, 400);
    }
    //  jwt expire error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is expired,Try again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errorlocation: err.stack,
    });
};