import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
// GET all services
router.get('/', getAllServices);

// GET service by ID
router.get('/:id', getServiceById);

// Protected routes (admin only)
// POST a new service
router.post('/', adminAuth, createService);

// UPDATE a service
router.put('/:id', adminAuth, updateService);

// DELETE a service
router.delete('/:id', adminAuth, deleteService);

export default router;
