require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const autoSeed = require('./utils/autoSeed');

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to database then auto-seed and start server
connectDB()
  .then(async () => {
    // Run auto-seed check (creates admin & initial data if database is fresh)
    await autoSeed();

    const server = app.listen(PORT, () => {
      console.log(`\n🏛️  JUSTICIA Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! Shutting down...');
      console.error(err.name, err.message);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
