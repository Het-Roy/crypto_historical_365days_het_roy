const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.loginOptions = (req, res) => {
  res.set("Allow", "POST,OPTIONS").status(204).end();
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Record already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role: role || "user", emailVerificationToken: "dummy-token" });
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: '7d' });
    
    // Convert to object and remove password
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.revokedTokens;

    res.status(201).json({ message: "User registered successfully", token, user: userObj });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: '7d' });
    
    // Convert to object and remove password
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.revokedTokens;

    res.json({ token, user: userObj });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await User.findByIdAndUpdate(req.user._id, { $push: { revokedTokens: token } });
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).select("-password");
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Profile deleted" });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    // In real app, generate token, send email
    res.json({ message: "Password reset link sent" });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });
    // Assume token is valid for demo
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Find user by token (demo logic skipped)
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    // Real logic to find by token
    await User.findOneAndUpdate({ emailVerificationToken: token }, { isEmailVerified: true });
    res.json({ message: "Email verified" });
  } catch (err) {
    next(err);
  }
};
