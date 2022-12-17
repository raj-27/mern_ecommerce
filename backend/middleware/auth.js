const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncError(async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new Errorhandler("Please Login user", 401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new Errorhandler(
                    `Role : ${req.user.role} is not allowed to access this resource`
                ),
                403
            );
        }
        next();
    };
};