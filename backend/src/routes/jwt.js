const express = require("express");
const authMiddleware = require("../middleware/auth");
const jwtController = require("../controllers/jwt");

const router = express.Router();

router.post("/generate-token", jwtController.generateToken);
router.post("/verify-token", jwtController.verifyToken);
router.post("/refresh-token", jwtController.refreshToken);
router.delete("/revoke-token", authMiddleware, jwtController.revokeToken);

module.exports = router;
