exports.logger = (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}`);
  res.json({ message: "Logged to console" });
};

exports.auth = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  res.json({ message: "Auth header present" });
};

exports.rateLimit = (req, res) => {
  res.json({ message: "Rate limit demo endpoint" });
};

exports.errorHandler = (req, res, next) => {
  const err = new Error("Demo error");
  err.status = 400;
  next(err);
};
