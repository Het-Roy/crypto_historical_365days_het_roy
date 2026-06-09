const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
      
      const user = await User.findById(decoded.id).select("+revokedTokens");
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (user.revokedTokens && user.revokedTokens.includes(token)) {
        return res.status(401).json({ error: "Token revoked" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
