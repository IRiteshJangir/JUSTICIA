require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const adminExists = await User.findOne({ email: 'admin@justicia.com' });
    
    if (adminExists) {
      console.log('Admin user already exists.');
    } else {
      await User.create({
        name: 'Admin',
        email: 'admin@justicia.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('Admin user created successfully.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
