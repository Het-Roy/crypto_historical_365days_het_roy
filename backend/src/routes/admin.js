const express = require("express");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const adminController = require("../controllers/admin");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/dashboard", adminController.getDashboard);
router.options("/coins", (req, res) => res.set("Allow", "GET,OPTIONS").status(204).end());
router.get("/coins", adminController.getAdminCoins);
router.get("/stats", adminController.getAdminStats);
router.get("/users", adminController.getAdminUsers);

module.exports = router;
