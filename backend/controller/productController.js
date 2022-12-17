const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Creating Product---Admin Only
exports.createProduct = catchAsyncError(async(req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Product---user
exports.getAllProducts = catchAsyncError(async(req, res, next) => {
    const Limit = 5;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(Limit);
    let products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        Limit,
    });
});

// Get Product Details---user
exports.getProductDetails = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new Errorhandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product,
    });
});

// Update Product----Admin Only
exports.updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res
            .status(500)
            .json({ success: false, message: "Product not found" });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        userFindAndModify: false,
    });
    res.status(201).json({ success: true });
});

// Delete Product ---Admin only
exports.deleteProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res
            .status(500)
            .json({ success: false, message: "Product not found" });
    }
    await product.remove();
    res
        .status(200)
        .json({ success: true, message: "Product Deleted Sccesfully" });
});

// create new review or update review
exports.createProductReview = catchAsyncError(async(req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let average = 0;
    product.reviews.forEach((rev) => (average += rev.rating));
    product.ratings = average / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({ success: true });
});

// Get All reviews of Single Product
exports.getProductReviews = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log({ params: req.params, query: req.query });
    console.log(req);

    // if product not found
    if (!product) {
        return next(new Errorhandler(`Product not Found`, 404));
    }
    let reviews = product.reviews;
    res.status(200).json({ success: true, reviews });
});

// Delete Review---Admin Right
exports.deleteProductReview = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);
    // if product not found
    if (!product) {
        return next(new Errorhandler(`Product not Found`, 404));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id
    );
    let average = 0;
    reviews.forEach((rev) => (average += rev.rating));
    const ratings = average / reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
        req.query.productId, {
            reviews,
            ratings,
            numOfReviews,
        }, { new: true, runValidator: true, userFindAndModify: false }
    );
    res.status(200).json({ success: true });
});