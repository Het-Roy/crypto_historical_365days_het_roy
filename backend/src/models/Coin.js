const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────
    coin_id: {
      type: String,
      required: [true, "coin_id is required"],
      lowercase: true,
      trim: true,
      index: true,            // queried frequently
    },
    coin_name: {
      type: String,
      required: [true, "coin_name is required"],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, "symbol is required"],
      uppercase: true,
      trim: true,
      index: true,
    },
    market_cap_rank: {
      type: Number,
      default: null,
      min: [1, "Rank must be ≥ 1"],
    },

    // ── Timestamps ────────────────────────────────────────────
    timestamp: {
      type: Date,
      required: [true, "timestamp is required"],
      index: true,
    },
    date: {
      type: String,           // "YYYY-MM-DD" – kept as string for easy filtering
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"],
    },
    month: {
      type: String,           // "YYYY-MM"
      required: true,
      match: [/^\d{4}-\d{2}$/, "month must be YYYY-MM"],
      index: true,
    },

    // ── Market Data ───────────────────────────────────────────
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price cannot be negative"],
    },
    market_cap: {
      type: Number,
      default: null,
      min: [0, "market_cap cannot be negative"],
    },
    volume: {
      type: Number,
      default: null,
      min: [0, "volume cannot be negative"],
    },

    // ── Return / Performance ──────────────────────────────────
    daily_return: {
      type: Number,
      default: null,          // null on first record (no previous day)
    },
    cumulative_return: {
      type: Number,
      default: null,
    },

    // ── Moving Averages ───────────────────────────────────────
    price_ma7: {
      type: Number,
      default: null,
    },
    price_ma30: {
      type: Number,
      default: null,
    },

    // ── Risk Metrics ──────────────────────────────────────────
    volatility_7d: {
      type: Number,
      default: null,          // null until 7 days of data exist
      min: [0, "volatility cannot be negative"],
    },
  },
  {
    timestamps: true,   // adds createdAt & updatedAt automatically
    versionKey: false,
  }
);

// ── Compound Indexes ──────────────────────────────────────────
// Prevent duplicate records for the same coin on the same day
CoinSchema.index({ coin_id: 1, date: 1 }, { unique: true });

// Speed up month-based + coin-based lookups
CoinSchema.index({ coin_id: 1, month: 1 });

// Speed up rank-based leaderboard queries
CoinSchema.index({ market_cap_rank: 1, timestamp: -1 });

// Speed up analytics sorts
CoinSchema.index({ price: -1 });
CoinSchema.index({ volume: -1 });
CoinSchema.index({ daily_return: -1 });
CoinSchema.index({ market_cap: -1 });
CoinSchema.index({ volatility_7d: -1 });

// ── Virtual: formatted price label ───────────────────────────
CoinSchema.virtual("price_label").get(function () {
  return `$${this.price?.toFixed(2)}`;
});

// ── Static: fields that identify missing/null values ─────────
CoinSchema.statics.NULLABLE_FIELDS = [
  "daily_return",
  "volatility_7d",
  "cumulative_return",
  "price_ma7",
  "price_ma30",
  "market_cap",
  "volume",
];

const Coin = mongoose.model("Coin", CoinSchema);
module.exports = Coin;
