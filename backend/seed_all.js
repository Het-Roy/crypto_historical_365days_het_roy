const mongoose = require('mongoose');
const Coin = require('./src/models/Coin');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto_api';

// Realistic 15-day historical data for BTC, ETH, SOL (Dec 4-18 2024)
const seedData = [
  // Bitcoin
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-04T00:00:00', date:'2024-12-04', price:97617.68, market_cap:1934000000000, volume:53800000000, daily_return:null, price_ma7:97617.68, price_ma30:97617.68, volatility_7d:null, cumulative_return:null, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-05T00:00:00', date:'2024-12-05', price:101400.90, market_cap:2009000000000, volume:62000000000, daily_return:3.87, price_ma7:99509.29, price_ma30:99509.29, volatility_7d:null, cumulative_return:3.87, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-06T00:00:00', date:'2024-12-06', price:99820.50, market_cap:1978000000000, volume:55200000000, daily_return:-1.56, price_ma7:99613.03, price_ma30:99613.03, volatility_7d:3.85, cumulative_return:2.26, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-07T00:00:00', date:'2024-12-07', price:103880.10, market_cap:2059000000000, volume:67400000000, daily_return:4.07, price_ma7:100679.80, price_ma30:100679.80, volatility_7d:3.62, cumulative_return:6.42, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-08T00:00:00', date:'2024-12-08', price:99990.02, market_cap:1982000000000, volume:48100000000, daily_return:-3.74, price_ma7:100541.84, price_ma30:100541.84, volatility_7d:3.44, cumulative_return:2.43, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-09T00:00:00', date:'2024-12-09', price:98620.15, market_cap:1956000000000, volume:43900000000, daily_return:-1.37, price_ma7:100221.56, price_ma30:100221.56, volatility_7d:3.15, cumulative_return:1.03, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-10T00:00:00', date:'2024-12-10', price:97100.30, market_cap:1926000000000, volume:52300000000, daily_return:-1.54, price_ma7:99775.66, price_ma30:99775.66, volatility_7d:3.28, cumulative_return:-0.53, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-11T00:00:00', date:'2024-12-11', price:101200.45, market_cap:2006000000000, volume:59700000000, daily_return:4.22, price_ma7:99947.73, price_ma30:99947.73, volatility_7d:3.47, cumulative_return:3.66, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-12T00:00:00', date:'2024-12-12', price:104600.80, market_cap:2074000000000, volume:73200000000, daily_return:3.36, price_ma7:100947.67, price_ma30:100947.67, volatility_7d:3.58, cumulative_return:7.15, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-13T00:00:00', date:'2024-12-13', price:106100.25, market_cap:2104000000000, volume:68900000000, daily_return:1.43, price_ma7:101619.00, price_ma30:101619.00, volatility_7d:3.31, cumulative_return:8.69, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-14T00:00:00', date:'2024-12-14', price:103450.15, market_cap:2051000000000, volume:55600000000, daily_return:-2.50, price_ma7:101866.17, price_ma30:101866.17, volatility_7d:3.22, cumulative_return:5.97, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-15T00:00:00', date:'2024-12-15', price:105770.50, market_cap:2097000000000, volume:62400000000, daily_return:2.24, price_ma7:102634.66, price_ma30:102634.66, volatility_7d:3.14, cumulative_return:8.35, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-16T00:00:00', date:'2024-12-16', price:107000.00, market_cap:2121000000000, volume:71500000000, daily_return:1.16, price_ma7:103460.35, price_ma30:103460.35, volatility_7d:2.98, cumulative_return:9.61, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-17T00:00:00', date:'2024-12-17', price:105100.30, market_cap:2083000000000, volume:63300000000, daily_return:-1.78, price_ma7:104474.68, price_ma30:104474.68, volatility_7d:2.87, cumulative_return:7.67, month:'2024-12' },
  { coin_id:'bitcoin', coin_name:'Bitcoin', symbol:'BTC', market_cap_rank:1, timestamp:'2024-12-18T00:00:00', date:'2024-12-18', price:101730.90, market_cap:2017000000000, volume:82100000000, daily_return:-3.21, price_ma7:104307.27, price_ma30:104307.27, volatility_7d:3.05, cumulative_return:4.22, month:'2024-12' },

  // Ethereum
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-04T00:00:00', date:'2024-12-04', price:3900.15, market_cap:469000000000, volume:28100000000, daily_return:null, price_ma7:3900.15, price_ma30:3900.15, volatility_7d:null, cumulative_return:null, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-05T00:00:00', date:'2024-12-05', price:4090.60, market_cap:491000000000, volume:31400000000, daily_return:4.88, price_ma7:3995.38, price_ma30:3995.38, volatility_7d:null, cumulative_return:4.88, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-06T00:00:00', date:'2024-12-06', price:3970.40, market_cap:477000000000, volume:22800000000, daily_return:-2.94, price_ma7:3987.05, price_ma30:3987.05, volatility_7d:5.55, cumulative_return:1.80, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-07T00:00:00', date:'2024-12-07', price:4200.80, market_cap:505000000000, volume:35500000000, daily_return:5.80, price_ma7:4040.49, price_ma30:4040.49, volatility_7d:5.17, cumulative_return:7.71, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-08T00:00:00', date:'2024-12-08', price:4050.20, market_cap:487000000000, volume:25400000000, daily_return:-3.59, price_ma7:4042.43, price_ma30:4042.43, volatility_7d:4.95, cumulative_return:3.85, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-09T00:00:00', date:'2024-12-09', price:3850.75, market_cap:463000000000, volume:19800000000, daily_return:-4.93, price_ma7:4010.42, price_ma30:4010.42, volatility_7d:5.29, cumulative_return:-1.27, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-10T00:00:00', date:'2024-12-10', price:3720.40, market_cap:447000000000, volume:24100000000, daily_return:-3.38, price_ma7:3969.04, price_ma30:3969.04, volatility_7d:5.54, cumulative_return:-4.61, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-11T00:00:00', date:'2024-12-11', price:3880.90, market_cap:466000000000, volume:29300000000, daily_return:4.31, price_ma7:3952.00, price_ma30:3952.00, volatility_7d:5.37, cumulative_return:-0.49, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-12T00:00:00', date:'2024-12-12', price:4110.35, market_cap:494000000000, volume:33500000000, daily_return:5.92, price_ma7:3983.34, price_ma30:3983.34, volatility_7d:5.44, cumulative_return:5.39, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-13T00:00:00', date:'2024-12-13', price:4300.20, market_cap:517000000000, volume:41200000000, daily_return:4.62, price_ma7:4016.23, price_ma30:4016.23, volatility_7d:5.38, cumulative_return:10.26, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-14T00:00:00', date:'2024-12-14', price:4150.60, market_cap:499000000000, volume:31800000000, daily_return:-3.48, price_ma7:4008.91, price_ma30:4008.91, volatility_7d:5.21, cumulative_return:6.42, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-15T00:00:00', date:'2024-12-15', price:4050.80, market_cap:487000000000, volume:26700000000, daily_return:-2.40, price_ma7:4037.57, price_ma30:4037.57, volatility_7d:5.07, cumulative_return:3.86, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-16T00:00:00', date:'2024-12-16', price:4180.15, market_cap:503000000000, volume:30200000000, daily_return:3.19, price_ma7:4067.57, price_ma30:4067.57, volatility_7d:4.93, cumulative_return:7.18, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-17T00:00:00', date:'2024-12-17', price:4090.40, market_cap:492000000000, volume:28100000000, daily_return:-2.15, price_ma7:4080.34, price_ma30:4080.34, volatility_7d:4.76, cumulative_return:4.88, month:'2024-12' },
  { coin_id:'ethereum', coin_name:'Ethereum', symbol:'ETH', market_cap_rank:2, timestamp:'2024-12-18T00:00:00', date:'2024-12-18', price:3870.25, market_cap:465000000000, volume:38900000000, daily_return:-5.38, price_ma7:4106.18, price_ma30:4106.18, volatility_7d:5.02, cumulative_return:-0.76, month:'2024-12' },

  // Solana
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-04T00:00:00', date:'2024-12-04', price:228.40, market_cap:108000000000, volume:7800000000, daily_return:null, price_ma7:228.40, price_ma30:228.40, volatility_7d:null, cumulative_return:null, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-05T00:00:00', date:'2024-12-05', price:236.80, market_cap:112000000000, volume:8900000000, daily_return:3.68, price_ma7:232.60, price_ma30:232.60, volatility_7d:null, cumulative_return:3.68, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-06T00:00:00', date:'2024-12-06', price:225.50, market_cap:106700000000, volume:6700000000, daily_return:-4.78, price_ma7:230.23, price_ma30:230.23, volatility_7d:5.96, cumulative_return:-1.27, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-07T00:00:00', date:'2024-12-07', price:241.20, market_cap:114100000000, volume:9400000000, daily_return:6.96, price_ma7:232.98, price_ma30:232.98, volatility_7d:6.44, cumulative_return:5.61, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-08T00:00:00', date:'2024-12-08', price:247.60, market_cap:117100000000, volume:10200000000, daily_return:2.65, price_ma7:235.90, price_ma30:235.90, volatility_7d:5.87, cumulative_return:8.41, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-09T00:00:00', date:'2024-12-09', price:240.10, market_cap:113600000000, volume:7100000000, daily_return:-3.03, price_ma7:236.60, price_ma30:236.60, volatility_7d:5.52, cumulative_return:5.12, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-10T00:00:00', date:'2024-12-10', price:222.80, market_cap:105400000000, volume:8800000000, daily_return:-7.20, price_ma7:234.63, price_ma30:234.63, volatility_7d:6.24, cumulative_return:-2.45, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-11T00:00:00', date:'2024-12-11', price:230.40, market_cap:109000000000, volume:7500000000, daily_return:3.41, price_ma7:234.69, price_ma30:234.69, volatility_7d:6.15, cumulative_return:0.88, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-12T00:00:00', date:'2024-12-12', price:245.90, market_cap:116400000000, volume:10900000000, daily_return:6.73, price_ma7:236.33, price_ma30:236.33, volatility_7d:6.31, cumulative_return:7.66, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-13T00:00:00', date:'2024-12-13', price:260.70, market_cap:123400000000, volume:14100000000, daily_return:6.02, price_ma7:238.39, price_ma30:238.39, volatility_7d:6.47, cumulative_return:14.14, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-14T00:00:00', date:'2024-12-14', price:252.30, market_cap:119400000000, volume:11200000000, daily_return:-3.22, price_ma7:242.86, price_ma30:242.86, volatility_7d:6.29, cumulative_return:10.47, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-15T00:00:00', date:'2024-12-15', price:244.10, market_cap:115500000000, volume:9700000000, daily_return:-3.25, price_ma7:249.47, price_ma30:249.47, volatility_7d:6.19, cumulative_return:6.87, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-16T00:00:00', date:'2024-12-16', price:255.80, market_cap:121000000000, volume:10500000000, daily_return:4.79, price_ma7:250.47, price_ma30:250.47, volatility_7d:6.04, cumulative_return:12.00, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-17T00:00:00', date:'2024-12-17', price:249.60, market_cap:118100000000, volume:8400000000, daily_return:-2.42, price_ma7:251.54, price_ma30:251.54, volatility_7d:5.91, cumulative_return:9.28, month:'2024-12' },
  { coin_id:'solana', coin_name:'Solana', symbol:'SOL', market_cap_rank:5, timestamp:'2024-12-18T00:00:00', date:'2024-12-18', price:238.90, market_cap:113100000000, volume:11800000000, daily_return:-4.29, price_ma7:252.54, price_ma30:252.54, volatility_7d:5.96, cumulative_return:4.60, month:'2024-12' },
];

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  let inserted = 0, skipped = 0;
  for (const doc of seedData) {
    try {
      await Coin.updateOne(
        { coin_id: doc.coin_id, date: doc.date },
        { $set: doc },
        { upsert: true }
      );
      inserted++;
    } catch (err) {
      console.log('Error on', doc.coin_id, doc.date, err.message);
      skipped++;
    }
  }
  console.log(`Done! Upserted: ${inserted}, Errors: ${skipped}`);
  
  // Verify
  const count = await Coin.countDocuments();
  const coins = await Coin.distinct('coin_id');
  console.log(`Total records in DB: ${count}`);
  console.log(`Distinct coins:`, coins);
  
  mongoose.connection.close();
});
