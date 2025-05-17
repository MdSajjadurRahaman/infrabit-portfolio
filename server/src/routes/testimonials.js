import express from 'express';
import {
  getAllTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
// GET all testimonials
router.get('/', getAllTestimonials);

// GET featured testimonials
router.get('/featured', getFeaturedTestimonials);

// GET testimonial by ID
router.get('/:id', getTestimonialById);

// Protected routes (admin only)
// POST a new testimonial
router.post('/', adminAuth, createTestimonial);

// UPDATE a testimonial
router.put('/:id', adminAuth, updateTestimonial);

// DELETE a testimonial
router.delete('/:id', adminAuth, deleteTestimonial);

export default router;
