const express = require('express');
const mongoose = require('mongoose');
const mainApp = require('../src/app');

// Vercel Serverless entry point
const app = express();

// Cache the MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing in Vercel Environment Variables");
  
  await mongoose.connect(uri);
  isConnected = true;
  console.log("Connected to MongoDB via Vercel Serverless");
};

// Ensure DB is connected before passing to the main app
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Since Vercel routes `/api/*` to this file, we mount the main app under `/api`
app.use('/api', mainApp);

module.exports = app;
