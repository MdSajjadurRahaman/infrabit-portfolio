import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/infrabit')
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    seedAdminUser()
      .then(() => {
        console.log('Admin user seed complete!');
        process.exit(0);
      })
      .catch(error => {
        console.error('Error seeding admin user:', error);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Seed default admin user
const seedAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists, skipping seed');
      return;
    }
    
    // Create new admin user
    const newAdmin = new User({
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@infrabit.io',
      password: process.env.ADMIN_PASSWORD || 'Admin@123', // This will be hashed automatically by the pre-save hook
      role: 'admin'
    });
    
    await newAdmin.save();
    console.log('Default admin user created successfully!');
  } catch (error) {
    console.error('Error seeding admin user:', error);
    throw error;
  }
};
