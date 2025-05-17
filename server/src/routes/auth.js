import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getCurrentUser
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register a new admin user
router.post('/register', register);

// Login
router.post('/login', login);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

// Get current user (protected route)
router.get('/me', authenticate, getCurrentUser);

export default router;
