require('dotenv').config();
const mongoose = require('mongoose');
const Coin = require('./src/models/Coin');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto_api';

// Generate 15 days of dummy historical data for a given coin
function generateData(coin_id, coin_name, symbol, rank, basePrice, baseMarketCap, baseVolume) {
  const records = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 15; i++) {
    const d = new Date('2024-12-04T00:00:00Z');
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Random daily movement between -5% and +5%
    const changePct = (Math.random() * 10) - 5;
    const previousPrice = currentPrice;
    currentPrice = currentPrice * (1 + (changePct / 100));
    
    records.push({
      coin_id,
      coin_name,
      symbol,
      market_cap_rank: rank,
      timestamp: d.toISOString(),
      date: dateStr,
      price: currentPrice,
      market_cap: baseMarketCap * (currentPrice / basePrice),
      volume: baseVolume * (0.8 + Math.random() * 0.4), // randomize volume slightly
      daily_return: i === 0 ? null : ((currentPrice - previousPrice) / previousPrice) * 100,
      price_ma7: currentPrice,
      price_ma30: currentPrice,
      volatility_7d: 3 + Math.random() * 4,
      cumulative_return: i === 0 ? null : ((currentPrice - basePrice) / basePrice) * 100,
      month: '2024-12'
    });
  }
  return records;
}

const coinsToAdd = [
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB', rank: 4, price: 600, mc: 88000000000, vol: 1500000000 },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', rank: 6, price: 0.55, mc: 30000000000, vol: 800000000 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', rank: 8, price: 0.15, mc: 21000000000, vol: 1200000000 },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', rank: 9, price: 0.45, mc: 16000000000, vol: 400000000 },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX', rank: 11, price: 35, mc: 13000000000, vol: 600000000 },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', rank: 14, price: 7, mc: 9000000000, vol: 200000000 },
  { id: 'matic-network', name: 'Polygon', symbol: 'MATIC', rank: 16, price: 0.70, mc: 6000000000, vol: 250000000 },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', rank: 15, price: 18, mc: 10000000000, vol: 350000000 },
  { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', rank: 21, price: 10, mc: 6000000000, vol: 150000000 },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', rank: 20, price: 80, mc: 5900000000, vol: 300000000 },
];

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB. Generating mock data for 10 new coins...');
  
  let allRecords = [];
  coinsToAdd.forEach(c => {
    allRecords = allRecords.concat(generateData(c.id, c.name, c.symbol, c.rank, c.price, c.mc, c.vol));
  });

  let inserted = 0, skipped = 0;
  for (const doc of allRecords) {
    try {
      await Coin.updateOne(
        { coin_id: doc.coin_id, date: doc.date },
        { $set: doc },
        { upsert: true }
      );
      inserted++;
    } catch (err) {
      skipped++;
    }
  }
  
  console.log(`Done! Upserted: ${inserted}, Errors: ${skipped}`);
  
  const count = await Coin.countDocuments();
  const distinctCoins = await Coin.distinct('coin_id');
  console.log(`Total records in DB: ${count}`);
  console.log(`Total distinct coins: ${distinctCoins.length}`);
  
  mongoose.connection.close();
});
