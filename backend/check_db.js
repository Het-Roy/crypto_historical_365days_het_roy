const mongoose = require('mongoose');
const Coin = require('./src/models/Coin');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crypto_api';

mongoose.connect(MONGO_URI).then(async () => {
  const count = await Coin.countDocuments();
  console.log('Total coins in DB:', count);
  const distinctCoins = await Coin.distinct('coin_id');
  console.log('Distinct coins in DB:', distinctCoins);
  mongoose.connection.close();
});
