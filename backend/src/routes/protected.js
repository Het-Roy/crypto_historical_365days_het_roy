const express = require("express");
const authMiddleware = require("../middleware/auth");
const coinsController = require("../controllers/coins");

const router = express.Router();

router.use(authMiddleware);

router.post("/coins", coinsController.create);
router.patch("/coins/:id", coinsController.update);
router.delete("/coins/:id", coinsController.delete);

module.exports = router;
