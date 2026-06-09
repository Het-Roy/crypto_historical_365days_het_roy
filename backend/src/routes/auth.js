const express = require("express");
const authMiddleware = require("../middleware/auth");
const authController = require("../controllers/auth");

const router = express.Router();

router.options("/login", authController.loginOptions);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.get("/profile", authMiddleware, authController.getProfile);
router.head("/profile", authMiddleware, authController.getProfile);
router.patch("/profile", authMiddleware, authController.updateProfile);
router.delete("/profile", authMiddleware, authController.deleteProfile);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authMiddleware, authController.changePassword);
router.post("/verify-email", authController.verifyEmail);

module.exports = router;
