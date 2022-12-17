const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

router.post("/order/new", isAuthenticated, newOrder);
router.get("/order/:id", isAuthenticated, getSingleOrder);
router.get("/orders/me", isAuthenticated, myOrder);
router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrder
);

router.put(
  "/admin/orders/:id",
  isAuthenticated,
  authorizeRole("admin"),
  updateOrder
);

router.delete(
  "/admin/orders/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteOrder
);
module.exports = router;
