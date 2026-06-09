const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.generateToken = async (req, res, next) => {
  try {
    const { id, role } = req.body;
    if (!id || !role) return res.status(400).json({ error: "Validation failed", fields: [] });
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET || "default_secret", { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token required" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    res.json({ data: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || "default_secret");
    const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: '15m' });
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

exports.revokeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await User.findByIdAndUpdate(req.user._id, { $push: { revokedTokens: token } });
    res.json({ message: "Token revoked" });
  } catch (err) {
    next(err);
  }
};
