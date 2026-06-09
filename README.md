# Cryptocurrency Historical Data Platform

## Problem Statement
While raw cryptocurrency prices are widely available, developers, analysts, and traders often struggle to extract actionable insights from historical data. Calculating moving averages, assessing market volatility, simulating portfolio allocations, and identifying broader market trends (bullish vs. bearish) usually requires complex, client-side data processing. Furthermore, public APIs often lack robust security, tailored aggregations, or rate-limited access for enterprise use.

## The Solution
This proje.+ct provides a robust, scalable backend API that not only stores comprehensive historical cryptocurrency metrics but also offloads complex calculations to the server. It utilizes advanced database aggregations to deliver ready-to-use analytics, portfolio simulations, and market sentiment alerts, all secured behind role-based JWT authentication and endpoint-specific rate limiting.

## Tech Stack
- **Backend Framework**: Node.js, Express.js (MVC Architecture)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Security**: express-rate-limit, CORS

## Key Features
- **Comprehensive Data Modeling**: Tracks market data (price, volume, market cap) and derived metrics (daily/cumulative returns, MA7, MA30, 7-day volatility).
- **Advanced Analytics API**: Endpoints for highest/lowest prices, average price, price growth trends, volume spikes, and high-volatility alerts.
- **Portfolio Simulation**: Simulates portfolio distributions and calculates equal-weight allocations across multiple coins.
- **Market Sentiment**: Dynamically calculates whether the market is bullish, bearish, or neutral based on aggregate daily returns.
- **Role-Based Access & Security**: Secure endpoints with tailored rate limiting for standard, auth, and admin routes.

## How to Run Locally
1. Clone the repository and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with `PORT` and `MONGO_URI` (defaults to `mongodb://127.0.0.1:27017/crypto_api` if left blank).
4. Start the server:
   ```bash
   npm start
   ```
5. The API will be accessible at `http://localhost:3000`.
