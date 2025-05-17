import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// JWT token generation
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );
};

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Register a new admin user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });
    
    await newUser.save();
    
    // Generate JWT token
    const token = generateToken(newUser._id);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login existing user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Forgot password - send reset email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Set token and expiration on user object
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    
    await user.save();
    
    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/reset-password/${resetToken}`;
    
    // Email content
    const mailOptions = {
      from: `InfraBit Admin <${process.env.EMAIL_FROM || 'noreply@infrabit.io'}>`,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested to reset your password. 
      
Please click on the following link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you did not request this, please ignore this email and your password will remain unchanged.`,
      html: `
        <h2>Password Reset Request</h2>
        <p>You are receiving this email because you (or someone else) have requested to reset your password.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; font-weight: bold; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 15px 0;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `
    };
    
    // Send email
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing password reset', error: error.message });
  }
};

// Reset password with token
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    // Find user by reset token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }
    
    // Set new password and clear reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    // Generate new JWT token
    const jwtToken = generateToken(user._id);
    
    res.status(200).json({
      message: 'Password has been reset successfully',
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};
