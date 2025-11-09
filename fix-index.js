require('dotenv').config();
const mongoose = require('mongoose');

async function dropIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connection.db.collection('users').dropIndex('uuid_1');
    console.log('Index uuid_1 dropped successfully');
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

dropIndex();