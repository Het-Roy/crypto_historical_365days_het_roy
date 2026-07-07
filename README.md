<div align="center">

# 🪙 CryptoVault

### *A Full-Stack Cryptocurrency Analytics Platform*

**[🌍 Live Demo (Render)](https://crypto-historical-365days-het-roy.onrender.com/coins) | [📝 Postman API Documentation](https://documenter.getpostman.com/view/50839290/2sBXwtqpfE)**

CryptoVault is a full-stack, production-grade cryptocurrency analytics platform designed to track, filter, and visualize historical market data. It mimics premium platforms like CoinMarketCap, presenting market analytics through a sleek, modern dark-themed dashboard.

Rather than relying on mocked or dummy mock data, CryptoVault runs entirely on a real dataset containing over 33,000 historical records across 100 different cryptocurrencies over a 365-day period.

<br />

*Track, analyze, and visualize 365 days of historical cryptocurrency data with a premium, real-time dashboard powered by interactive charts, deep analytics, and secure user authentication.*

<br />

</div>

## 🚨 The Problem
Tracking cryptocurrency data often involves either simplistic dashboards lacking deep historical context or overly complex trading terminals that are difficult for regular users to navigate. Furthermore, building a full-stack platform that efficiently processes, filters, and renders tens of thousands of data points (like 365 days of historical data for 100+ coins) usually results in severe client-side performance bottlenecks.

## 💡 The Solution
**CryptoVault** solves this by leveraging a robust backend pipeline with MongoDB aggregation to process a massive 33,000+ record dataset server-side. It offloads heavy computations (like generating 7-day sparkline charts and computing 24h percentage changes) to the database, ensuring the React frontend remains lightning-fast. The result is a premium, consumer-friendly interface that delivers deep historical analytics without sacrificing performance.

## 🛠️ Tech Stack
- **Frontend:** React.js (v19), Vite (v8), Tailwind CSS (v4), Lightweight Charts
- **Backend:** Node.js, Express.js (v5)
- **Database:** MongoDB, Mongoose (v9)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** Render (Backend/Frontend), MongoDB Atlas

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🎯 Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🖥️ Frontend](#️-frontend)
- [⚙️ Backend API](#️-backend-api)
- [🔐 Authentication](#-authentication)
- [📊 API Endpoints](#-api-endpoints)
- [🚀 Getting Started](#-getting-started)
- [🔧 Environment Variables](#-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🛡️ Security](#️-security)
- [📄 License](#-license)

---

## ✨ Overview

**CryptoVault** is a production-grade, full-stack cryptocurrency analytics platform built to mirror the experience of industry-leading tools like CoinMarketCap. It ingests, stores, and serves **365 days of historical market data** for multiple cryptocurrencies, and presents it through a sleek, dark-themed dashboard with interactive charts, sparklines, and real-time computed market insights.

> **What makes it different?** Every single data point — from the Global Market Cap to the Top Gainer and Top Loser — is dynamically computed from real historical records stored in MongoDB, not hardcoded or mocked.

---

## 🎯 Key Features

### 📈 Dashboard & Visualization
| Feature | Description |
|---|---|
| **Global Market Overview** | Real-time computed Global Market Cap, 24h Volume, Top Gainer & Top Loser cards |
| **Interactive Price Charts** | TradingView-style candlestick/line charts powered by Lightweight Charts |
| **7-Day Sparklines** | Inline mini-charts in the data table showing weekly price trends per coin |
| **Coin Detail Pages** | Deep-dive into any coin with full historical price charts, stats grid, and social sidebar |
| **Filterable Data Table** | Sort and filter coins by price, volume, market cap, and daily change |

### 🔐 Authentication System
| Feature | Description |
|---|---|
| **JWT Sessions** | Secure token-based auth with 7-day expiry |
| **User Registration** | Email + password signup with bcrypt hashing (10 salt rounds) |
| **Persistent Login** | Sessions survive page refresh via localStorage token + profile revalidation |
| **Token Revocation** | Logout invalidates tokens server-side — revoked tokens are permanently blocked |
| **Role-Based Access** | User and Admin roles with middleware-enforced authorization |

### 🧠 Advanced Analytics API
| Feature | Description |
|---|---|
| **100+ REST Endpoints** | Comprehensive coin data, filtering, sorting, analytics, and admin operations |
| **Portfolio Simulation** | Simulate historical portfolio performance across multiple coins |
| **Price Predictions** | Trend-based predictive analytics from historical data |
| **Volatility Alerts** | Automated detection of high-volatility and market-drop events |
| **Coin Comparison** | Compare 2 or 3 coins side-by-side on any metric |
| **Heatmap Data** | Correlation heatmaps across the entire coin universe |
| **Market Reports** | Auto-generated market analysis reports |

### 🛡️ Production-Ready Infrastructure
| Feature | Description |
|---|---|
| **Rate Limiting** | Endpoint-specific rate limits (auth, general, admin, export) |
| **Error Handling** | Global error handler with structured JSON error responses |
| **CORS Enabled** | Cross-origin requests fully configured |
| **Input Validation** | Mongoose schema-level validation with custom error messages |
| **Pagination** | Configurable `page` & `limit` on all list endpoints |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│  React 19 · Vite 8 · TailwindCSS 4 · Chart.js      │
│  Lightweight Charts · Lucide Icons · Axios          │
├─────────────────────────────────────────────────────┤
│                   REST API (JSON)                   │
├─────────────────────────────────────────────────────┤
│                    BACKEND                          │
│  Express 5 · JWT Auth · bcrypt · Rate Limiting      │
│  Mongoose ODM · Role Middleware                     │
├─────────────────────────────────────────────────────┤
│                    DATABASE                         │
│  MongoDB · Indexed Collections · Aggregation Pipes  │
└─────────────────────────────────────────────────────┘
```

---

## 🖥️ Frontend

The frontend is a **React 19** single-page application built with **Vite 8**, styled with **TailwindCSS 4**, and designed with a premium dark-mode aesthetic.

### Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Dashboard with stat cards, filter row, and paginated coin data table |
| `/coins/:id` | **Coin Detail** | Full asset page with price chart, stats grid, and social sidebar |
| `/login` | **Login** | Email/password authentication with error feedback |
| `/register` | **Register** | New account creation with password confirmation |

### Component Highlights

- **`TopNavBar`** — Responsive navigation with dynamic auth state (Login/Signup ↔ User/Logout)
- **`StatCards`** — 4 live-computed metric cards (Market Cap, Volume, Top Gainer, Top Loser)
- **`DataTable`** — Sortable table with inline sparklines, color-coded % changes, and coin logos
- **`MainPriceChart`** — TradingView-powered interactive chart with time range selectors
- **`BottomStatusBar`** — Live scrolling ticker with market dominance, gas prices, and fear/greed index

---

## ⚙️ Backend API

The backend is a **RESTful API** built with **Express 5** and **Mongoose 9**, structured in an MVC pattern.

### Architecture Pattern

```
routes/  →  controllers/  →  models/  →  MongoDB
                ↑
          middleware/
      (auth, roles, rate-limit, errors)
```

### Data Model

The `Coin` schema captures rich historical data per record:

| Field | Type | Description |
|---|---|---|
| `coin_id` | String | Unique identifier (e.g., `bitcoin`) |
| `coin_name` | String | Display name (e.g., `Bitcoin`) |
| `symbol` | String | Ticker symbol (e.g., `BTC`) |
| `market_cap_rank` | Number | Global ranking |
| `price` | Number | Price at snapshot |
| `market_cap` | Number | Total market capitalization |
| `volume` | Number | 24h trading volume |
| `daily_return` | Number | Day-over-day % change |
| `price_ma7` | Number | 7-day moving average |
| `price_ma30` | Number | 30-day moving average |
| `volatility_7d` | Number | 7-day rolling volatility |
| `cumulative_return` | Number | Return since start of dataset |
| `date` | Date | Snapshot date |
| `month` | String | Year-month grouping |

---

## 🔐 Authentication

The auth system is fully production-ready with **27/27 deployment tests passing**.

```
Register → Hash Password (bcrypt) → Store in MongoDB → Sign JWT → Return Token
Login    → Find User → Compare Hash → Sign JWT → Return Token  
Logout   → Revoke Token → Add to Blacklist → Block Future Use
Profile  → Verify JWT → Check Blacklist → Return User Data
```

### Security Measures
- ✅ Passwords hashed with **bcrypt** (10 salt rounds)
- ✅ JWT tokens signed with environment-configured secret
- ✅ Tokens expire after **7 days**
- ✅ Revoked tokens are **permanently blacklisted** per user
- ✅ Password field excluded from all query results by default (`select: false`)
- ✅ Rate limiting on `/auth/login` and `/auth/register`

---

## 📊 API Endpoints

<details>
<summary><strong>🪙 Coins — CRUD & Queries (30+ endpoints)</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/coins` | List all coins (paginated) |
| `POST` | `/coins` | Create a coin record |
| `GET` | `/coins/:id` | Get coin by ID |
| `PUT` | `/coins/:id` | Replace a coin record |
| `PATCH` | `/coins/:id` | Update a coin record |
| `DELETE` | `/coins/:id` | Delete a coin record |
| `GET` | `/coins/latest` | Get latest records |
| `GET` | `/coins/top-market-cap` | Top coins by market cap |
| `GET` | `/coins/top-volume` | Top coins by volume |
| `GET` | `/coins/top-gainers` | Biggest daily gainers |
| `GET` | `/coins/top-losers` | Biggest daily losers |
| `GET` | `/coins/trending` | Trending coins |
| `GET` | `/coins/name/:name` | Find by coin name |
| `GET` | `/coins/symbol/:symbol` | Find by ticker symbol |
| `GET` | `/coins/rank/:rank` | Find by market cap rank |
| `GET` | `/coins/date/:date` | Find by specific date |
| `GET` | `/coins/month/:month` | Find by month |
| `GET` | `/coins/history/:coinId` | Full price history |
| `GET` | `/coins/performance/:coinId` | Performance metrics |
| `GET` | `/coins/volatility/:coinId` | Volatility analysis |
| `GET` | `/coins/compare/:c1/:c2` | Compare two coins |
| `POST` | `/coins/bulk-create` | Bulk insert records |
| `PATCH` | `/coins/bulk-update` | Bulk update records |
| `DELETE` | `/coins/bulk-delete` | Bulk delete records |

</details>

<details>
<summary><strong>📊 Sorting & Filtering (17 endpoints)</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/coins/sort/price-asc` | Sort by price ascending |
| `GET` | `/coins/sort/price-desc` | Sort by price descending |
| `GET` | `/coins/sort/volume-desc` | Sort by volume descending |
| `GET` | `/coins/sort/rank-asc` | Sort by rank ascending |
| `GET` | `/coins/sort/return-desc` | Sort by return descending |
| `GET` | `/coins/filter/high-price` | Filter high price coins |
| `GET` | `/coins/filter/low-price` | Filter low price coins |
| `GET` | `/coins/filter/high-volume` | Filter high volume |
| `GET` | `/coins/filter/high-market-cap` | Filter high market cap |
| `GET` | `/coins/filter/high-volatility` | Filter high volatility |
| `GET` | `/coins/filter/bullish` | Filter bullish coins |
| `GET` | `/coins/filter/bearish` | Filter bearish coins |
| `GET` | `/coins/filter/profitable` | Filter profitable coins |
| `GET` | `/coins/filter/loss-making` | Filter loss-making coins |

</details>

<details>
<summary><strong>🧠 Analytics (15 endpoints)</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/analytics/price/highest` | Highest price ever recorded |
| `GET` | `/analytics/price/lowest` | Lowest price recorded |
| `GET` | `/analytics/price/average` | Average price across all data |
| `GET` | `/analytics/price/growth` | Biggest price growth events |
| `GET` | `/analytics/price/drop` | Biggest price drop events |
| `GET` | `/analytics/price/trend` | Price trend analysis |
| `GET` | `/analytics/volume/spike` | Volume spike detection |
| `GET` | `/analytics/volume/highest` | Highest volume recorded |
| `GET` | `/analytics/returns/cumulative` | Cumulative returns |
| `GET` | `/analytics/returns/top` | Top returning coins |
| `GET` | `/analytics/volatility/high` | High volatility alerts |

</details>

<details>
<summary><strong>📈 Statistics (12 endpoints)</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stats/market-cap` | Total market cap |
| `GET` | `/stats/market-summary` | Full market overview |
| `GET` | `/stats/monthly-analysis` | Month-over-month analysis |
| `GET` | `/stats/daily-analysis` | Day-over-day analysis |
| `GET` | `/stats/yearly-analysis` | Year-over-year analysis |
| `GET` | `/stats/top-gainers` | Statistical top gainers |
| `GET` | `/stats/top-losers` | Statistical top losers |
| `GET` | `/stats/coin-count` | Total coins tracked |
| `GET` | `/stats/rank-distribution` | Rank distribution |
| `GET` | `/stats/price-distribution` | Price distribution |
| `GET` | `/stats/volatility-distribution` | Volatility distribution |

</details>

<details>
<summary><strong>🚀 Advanced (12 endpoints)</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/coins/random` | Get a random coin |
| `GET` | `/coins/recommendations` | AI-powered recommendations |
| `GET` | `/coins/predictions` | Price predictions |
| `GET` | `/coins/portfolio/simulate` | Portfolio simulation |
| `GET` | `/coins/heatmap` | Correlation heatmap |
| `GET` | `/coins/market-status` | Overall market status |
| `GET` | `/coins/alerts/high-volatility` | Volatility alerts |
| `GET` | `/coins/alerts/market-drop` | Market drop alerts |
| `GET` | `/coins/system/health` | System health check |
| `GET` | `/coins/system/version` | API version info |
| `POST` | `/coins/report` | Generate market report |

</details>

<details>
<summary><strong>🔐 Authentication (10 endpoints)</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login & receive JWT |
| `POST` | `/auth/logout` | Logout & revoke token |
| `GET` | `/auth/profile` | Get user profile |
| `PATCH` | `/auth/profile` | Update user profile |
| `DELETE` | `/auth/profile` | Delete account |
| `POST` | `/auth/forgot-password` | Request password reset |
| `POST` | `/auth/reset-password` | Reset password |
| `POST` | `/auth/change-password` | Change password |
| `POST` | `/auth/verify-email` | Verify email address |

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v7 or higher (local or Atlas)
- **npm** v9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/Het-Roy/crypto_historical_365days_het_roy.git
cd crypto_historical_365days_het_roy
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/crypto_api
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Optionally create a `.env` file for production API URL:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

### 4. Open in Browser

Navigate to **http://localhost:5173** and explore your crypto dashboard! 🎉

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | ✅ | `mongodb://127.0.0.1:27017/crypto_api` | MongoDB connection string |
| `JWT_SECRET` | ✅ | `default_secret` | Secret key for JWT signing |
| `PORT` | ❌ | `3000` | Server port |

### Frontend (`frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | ❌ | `http://localhost:3000` | Backend API base URL |

---

## 📁 Project Structure

```
crypto_historical/
│
├── backend/                    # Express.js REST API
│   ├── src/
│   │   ├── app.js              # Express app setup, CORS, middleware
│   │   ├── server.js           # Server entry point, MongoDB connection
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route handlers
│   │   │   ├── auth.js         # Authentication logic
│   │   │   ├── coins.js        # Coin CRUD & queries
│   │   │   ├── analytics.js    # Analytics computations
│   │   │   ├── stats.js        # Statistical aggregations
│   │   │   ├── advanced.js     # Predictions, portfolio sim, heatmaps
│   │   │   ├── admin.js        # Admin operations
│   │   │   ├── jwt.js          # JWT utilities
│   │   │   └── search.js       # Search functionality
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT verification middleware
│   │   │   ├── role.js         # Role-based access control
│   │   │   ├── rateLimiter.js  # Rate limiting rules
│   │   │   └── errorHandler.js # Global error handler
│   │   ├── models/
│   │   │   ├── Coin.js         # Coin schema (14 fields, indexed)
│   │   │   └── User.js         # User schema (auth, roles, tokens)
│   │   ├── routes/             # Route definitions (10 files)
│   │   └── utils/              # Utility functions
│   ├── package.json
│   └── .env
│
├── frontend/                   # React 19 SPA
│   ├── src/
│   │   ├── App.jsx             # Root component with routing
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Main dashboard
│   │   │   ├── CoinDetail.jsx  # Individual coin deep-dive
│   │   │   ├── Login.jsx       # Login page
│   │   │   └── Register.jsx    # Registration page
│   │   ├── components/
│   │   │   ├── TopNavBar.jsx   # Navigation with dynamic auth
│   │   │   ├── StatCards.jsx   # Live market stat cards
│   │   │   ├── FilterRow.jsx   # Table filter controls
│   │   │   ├── MainPriceChart.jsx  # TradingView chart
│   │   │   ├── BottomStatusBar.jsx # Scrolling ticker bar
│   │   │   ├── table/          # DataTable, DataTableRow, SparklineCell
│   │   │   └── cards/          # SparklineStatCard
│   │   ├── services/
│   │   │   └── api.js          # Axios API client with interceptors
│   │   └── utils/
│   │       └── coinUtils.js    # Shared coin aggregation utilities
│   ├── package.json
│   └── vite.config.js
│
├── dataset.json                # Sample dataset
└── README.md                   # ← You are here
```

---

## 🛡️ Security

| Layer | Implementation |
|---|---|
| **Password Storage** | bcrypt with 10 salt rounds |
| **Authentication** | JWT Bearer tokens (7-day expiry) |
| **Token Revocation** | Server-side blacklist per user |
| **Rate Limiting** | Per-endpoint limits (auth: strict, general: moderate) |
| **Input Validation** | Mongoose schema validators with custom messages |
| **CORS** | Enabled for cross-origin frontend requests |
| **Error Handling** | Structured JSON errors, no stack traces in production |
| **Data Privacy** | Password and token fields excluded from queries by default |

---

## 🧪 Testing

Run the deployment readiness test suite:

```bash
node test_deploy.js
```

```
📊 RESULTS: 27 passed, 0 failed out of 27 tests
🚀 DEPLOYMENT READY — All auth tests passed!
```

---

<div align="center">

### Built with ❤️ by Het Roy

*If you found this project useful, consider giving it a ⭐!*

---

**[⬆ Back to Top](#-cryptovault)**

</div>
