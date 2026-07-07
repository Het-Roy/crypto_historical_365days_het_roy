/**
 * Migration script: converts string numeric fields to actual Numbers in MongoDB.
 * This fixes sort/filter/aggregation operations that fail on string-typed numeric data.
 */
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto_api';

const numericFields = [
  'market_cap_rank', 'price', 'market_cap', 'volume',
  'daily_return', 'price_ma7', 'price_ma30',
  'volatility_7d', 'cumulative_return'
];

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB:', MONGO_URI);
  const db = mongoose.connection.db;
  const collection = db.collection('coins');

  const totalDocs = await collection.countDocuments();
  console.log(`Total documents: ${totalDocs}`);
  console.log('Converting string fields to numbers...\n');

  // Process in batches
  const batchSize = 1000;
  let processed = 0;
  let converted = 0;

  const cursor = collection.find({});
  let batch = [];

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    const updates = {};
    let needsUpdate = false;

    for (const field of numericFields) {
      const val = doc[field];
      if (typeof val === 'string') {
        if (val === '' || val === null || val === undefined) {
          updates[field] = null;
        } else {
          const num = Number(val);
          updates[field] = isNaN(num) ? null : num;
        }
        needsUpdate = true;
      }
    }

    // Also fix timestamp if it's a string
    if (typeof doc.timestamp === 'string' && !(doc.timestamp instanceof Date)) {
      const d = new Date(doc.timestamp);
      if (!isNaN(d.getTime())) {
        updates.timestamp = d;
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      batch.push({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: updates }
        }
      });
      converted++;
    }

    processed++;

    if (batch.length >= batchSize) {
      await collection.bulkWrite(batch);
      batch = [];
      process.stdout.write(`\r  Processed ${processed}/${totalDocs} (${Math.round(processed/totalDocs*100)}%)`);
    }
  }

  // Flush remaining
  if (batch.length > 0) {
    await collection.bulkWrite(batch);
  }

  console.log(`\n\nDone! Processed: ${processed}, Converted: ${converted}`);

  // Verify
  const sample = await collection.findOne();
  console.log('\nVerification — sample record field types:');
  for (const field of numericFields) {
    console.log(`  ${field}: ${typeof sample[field]} (${sample[field]})`);
  }
  console.log(`  timestamp: ${typeof sample.timestamp} (${sample.timestamp})`);

  mongoose.connection.close();
}).catch(err => {
  console.error('Connection failed:', err.message);
  process.exit(1);
});
