const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({ windowMs: 60_000, max: 100 });
const authLimiter = rateLimit({ windowMs: 60_000, max: 5 }); // brute-force guard
const adminLimiter = rateLimit({ windowMs: 60_000, max: 30 });
const exportLimiter = rateLimit({ windowMs: 60_000, max: 10 });

module.exports = {
  generalLimiter,
  authLimiter,
  adminLimiter,
  exportLimiter,
};
