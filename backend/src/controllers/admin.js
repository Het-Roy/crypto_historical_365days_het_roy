const Coin = require("../models/Coin");
const User = require("../models/User");

exports.getDashboard = (req, res) => {
  res.json({ message: "Welcome to admin dashboard" });
};

exports.getAdminCoins = async (req, res, next) => {
  try {
    const coins = await Coin.find().limit(50);
    res.json({ data: coins, message: "Admin coin list" });
  } catch (err) { next(err); }
};

exports.getAdminStats = async (req, res, next) => {
  try {
    const coinCount = await Coin.countDocuments();
    let userCount = 0;
    if (User && User.countDocuments) {
        userCount = await User.countDocuments();
    }
    res.json({ data: { coinCount, userCount }, message: "Admin stats" });
  } catch (err) { next(err); }
};

exports.getAdminUsers = async (req, res, next) => {
  try {
    let users = [];
    if (User && User.find) {
        users = await User.find().select("-password");
    }
    res.json({ data: users, message: "Admin user list" });
  } catch (err) { next(err); }
};
