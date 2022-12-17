const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create new order
exports.newOrder = catchAsyncError(async(req, res, next) => {
    const { shippingInfo, orderItems, itemsPrice, taxPrice, totalPrice } =
    req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        totalPrice,
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        order,
    });
});

// get single order
exports.getSingleOrder = catchAsyncError(async(req, res, next) => {
    console.log(req.params.id);
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(new Errorhandler("Order not found with this id ", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

// get logges in user order
exports.myOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        order,
    });
});

// get All Order-----Admin
exports.getAllOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.find();
    let totalAmount = 0;
    order.forEach((order) => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        order,
        totalAmount,
    });
});

// update  Order-Status----Admin
exports.updateOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.find(req.params.id);
    if (order.status === "Delivered") {
        return next(new Errorhandler("You have delivered this product", 400));
    }
    order.orderItemms.forEach(async(ord) => {
        await updateStock(ord.Product, ord.quantity);
    });
    order.ordetStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.delivereAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        order,
        totalAmount,
    });
});

async function updateStock(id, qty) {
    const product = await Product.findById(id);
    price.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// Delete Orders
exports.deleteOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new Errorhandler("Order not found with this id ", 404));
    }
    await order.remove();
    res.status(200).json({
        success: true,
    });
});