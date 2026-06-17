const mongoose = require('mongoose');
const Coin = require('./src/models/Coin');
const fs = require('fs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto_api';

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  let inserted = 0, skipped = 0;
  
  try {
    const rawData = fs.readFileSync('../full_aave_dataset.json', 'utf8');
    const seedData = JSON.parse(rawData);
    
    for (const doc of seedData) {
      try {
        // Ensure numeric fields are parsed correctly if they are strings
        const cleanDoc = { ...doc };
        ['price', 'market_cap', 'volume', 'daily_return', 'price_ma7', 'price_ma30', 'volatility_7d', 'cumulative_return'].forEach(field => {
          if (cleanDoc[field] === "" || cleanDoc[field] === null || cleanDoc[field] === undefined) {
            cleanDoc[field] = null;
          } else {
            cleanDoc[field] = Number(cleanDoc[field]);
          }
        });
        
        await Coin.updateOne(
          { coin_id: cleanDoc.coin_id, date: cleanDoc.date },
          { $set: cleanDoc },
          { upsert: true }
        );
        inserted++;
      } catch (err) {
        console.log('Error on', doc.coin_id, doc.date, err.message);
        skipped++;
      }
    }
  } catch (err) {
    console.log("Error reading file:", err.message);
  }
  
  console.log(`Done! Upserted: ${inserted}, Errors: ${skipped}`);
  
  // Verify
  const count = await Coin.countDocuments();
  console.log(`Total records in DB: ${count}`);
  
  mongoose.connection.close();
});
