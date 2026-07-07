const express = require("express");
const cors = require("cors");
const { generalLimiter, authLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const coinRoutes = require("./routes/coins");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Rate limiting
app.use("/coins", generalLimiter);
app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);

// Mount routes
app.use("/auth", authRoutes);
app.use("/coins", coinRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
