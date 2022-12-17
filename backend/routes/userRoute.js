const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require("../controller/userController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticated, getUserDetails);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/me/update", isAuthenticated, updateProfile);
router.get("/admin/users", isAuthenticated, authorizeRole("admin"), getAllUser);
router.get(
    "/admin/user/:id",
    isAuthenticated,
    authorizeRole("admin"),
    getSingleUser
);
router.put(
    "/admin/user/:id",
    isAuthenticated,
    authorizeRole("admin"),
    updateUserRole
);
router.delete(
    "/admin/user/:id",
    isAuthenticated,
    authorizeRole("admin"),
    deleteUser
);
module.exports = router;