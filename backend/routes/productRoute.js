const express = require("express");
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    getAllProducts,
    getProductReviews,
    deleteProductReview,
    createProductReview,
} = require("../controller/productController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProductDetails);
router.post(
    "/product/new",
    isAuthenticated,
    authorizeRole("admin"),
    isAuthenticated,
    createProduct
);
router.put(
    "/product/:id",
    isAuthenticated,
    authorizeRole("admin"),
    isAuthenticated,
    updateProduct
);
router.delete(
    "/product/:id",
    isAuthenticated,
    authorizeRole("admin"),
    isAuthenticated,
    deleteProduct
);

router.put("/review", isAuthenticated, createProductReview);
router.get("/reviews/:id", getProductReviews);
router.delete(
    "/reviews",
    isAuthenticated,
    // authorizeRole("admin"),
    deleteProductReview
);

module.exports = router;