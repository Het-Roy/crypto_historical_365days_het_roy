const express = require("express");
const searchController = require("../controllers/search");

const router = express.Router();

router.get("/", searchController.search);
router.options("/", (req, res) => res.set("Allow", "GET,OPTIONS").status(204).end());

module.exports = router;
