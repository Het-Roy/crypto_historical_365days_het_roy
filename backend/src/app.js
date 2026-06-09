const express = require("express");
const cors = require("cors");
const { generalLimiter, authLimiter, adminLimiter, exportLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const advancedRoutes = require("./routes/advanced");
const coinRoutes = require("./routes/coins");
const searchRoutes = require("./routes/search");
const analyticsRoutes = require("./routes/analytics");
const statsRoutes = require("./routes/stats");
const authRoutes = require("./routes/auth");
const jwtRoutes = require("./routes/jwt");
const adminRoutes = require("./routes/admin");
const middlewareRoutes = require("./routes/middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Rate limiting
app.use("/coins", generalLimiter);
app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);
app.use("/search/coins", generalLimiter);
app.use("/admin", adminLimiter);
app.use("/coins/export", exportLimiter);

// Mount routes
app.use("/search/coins", searchRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/stats", statsRoutes);
app.use("/auth", authRoutes);
app.use("/jwt", jwtRoutes);
app.use("/admin", adminRoutes);
app.use("/middleware", middlewareRoutes);

// Mount advanced routes before standard coin routes to prevent /coins/:id overriding
app.use("/coins", advancedRoutes);
app.use("/coins", coinRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
