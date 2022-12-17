const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// REGISTER USER
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 160,
        crop: "scale",
    });
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    sendToken(user, 201, res);
});

// LOGIN USER
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new Errorhandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new Errorhandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new Errorhandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});

// LOGOUT USER
exports.logoutUser = catchAsyncError(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// FORGOT PASSWORD
exports.forgotPassword = catchAsyncError(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new Errorhandler("User not found", 404));
    }
    // GET RESET PASSWORD TOKEN
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `your password reset token is:- \n\n ${resetPasswordUrl} \n\n If This process is not done by please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Link",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} Successfully!!`,
        });
    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new Errorhandler(error.message, 500));
    }
});

// RESET PASSWORD
exports.resetPassword = catchAsyncError(async(req, res, next) => {
    let { Password, confirmPassword } = req.body;
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(
            new Errorhandler(
                "Reset Passowrd Token is invalid or has been expired",
                404
            )
        );
    }
    if (Password !== confirmPassword) {
        return next(new Errorhandler("Password does not match", 404));
    }
    user.password = Password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
});

// GET USER DETAIL
exports.getUserDetails = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// UPDATE PASSWORD
exports.updatePassword = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new Errorhandler("Old password not match", 401));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new Errorhandler("Confirm Password not match ", 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// UPDATE PROFILE
exports.updateProfile = catchAsyncError(async(req, res, next) => {
    const newUserData = {
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
    };
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({ success: true, user });
});

// GET ALL USER PROFILE---ADMIN RIGHT
exports.getAllUser = catchAsyncError(async(req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// GET SINGLE USER PROFILE---ADMIN RIGHT
exports.getSingleUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new Errorhandler(`User does not exits with id:${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, user });
});

// UPDATE ROKE---ADMIN RIGHT
exports.updateUserRole = catchAsyncError(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({ success: true, user });
});

// DELETE NORMAL USER---ADMIN RIGHT
exports.deleteUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new Errorhandler(`User does not exits with ${req.params.id}`, 404)
        );
    }
    await user.remove();
    res.status(200).json({ success: true, message: "User deleted successfully" });
});