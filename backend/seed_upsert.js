const mongoose = require('mongoose');
const Coin = require('./src/models/Coin');
const fs = require('fs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto_api';

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  try {
    const data = JSON.parse(fs.readFileSync('../dataset.json', 'utf8'));
    
    const formattedData = data.map(item => {
      const formatted = { ...item };
      const numericFields = ['market_cap_rank', 'price', 'market_cap', 'volume', 'daily_return', 'price_ma7', 'price_ma30', 'volatility_7d', 'cumulative_return'];
      
      for (const field of numericFields) {
        if (formatted[field] === '') {
          formatted[field] = null;
        } else if (typeof formatted[field] === 'string') {
          formatted[field] = Number(formatted[field]);
        }
      }
      return formatted;
    });

    let inserted = 0;
    for (const doc of formattedData) {
       try {
           await Coin.updateOne(
               { coin_id: doc.coin_id, date: doc.date },
               { $set: doc },
               { upsert: true }
           );
           inserted++;
       } catch (err) {
           console.log("Error on", doc.coin_id, doc.date, err.message);
       }
    }
    console.log('Successfully upserted data, total documents updated/inserted:', inserted);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
});
