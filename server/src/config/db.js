const mongoose = require('mongoose');

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
  });

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      return;
    } catch (error) {
      retries += 1;
      console.error(`MongoDB connection attempt ${retries} failed. Retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error('Failed to connect to MongoDB after multiple attempts. Exiting...');
  process.exit(1);
};

module.exports = connectDB;
