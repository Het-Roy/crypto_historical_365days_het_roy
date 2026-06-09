const express = require("express");
const authMiddleware = require("../middleware/auth");
const jwtController = require("../controllers/jwt");
const roleMiddleware = require("../middleware/role");
const router = express.Router();

router.post("/generate-token", jwtController.generateToken);
router.post("/verify-token", jwtController.verifyToken);
router.post("/refresh-token", jwtController.refreshToken);
router.delete("/revoke-token", authMiddleware, jwtController.revokeToken);

router.get("/profile", authMiddleware, jwtController.getProfile);
router.options("/profile", (req, res) => res.set("Allow", "GET,OPTIONS").status(204).end());
router.get("/dashboard", authMiddleware, jwtController.getDashboard);
router.get("/admin", authMiddleware, roleMiddleware("admin"), jwtController.getAdmin);
router.get("/private-stats", authMiddleware, jwtController.getPrivateStats);

module.exports = router;
