import express from 'express';
import { 
  contactSubmission, 
  getAllContacts,
  updateContactStatus
} from '../controllers/contactController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
// POST contact form submission
router.post('/', contactSubmission);

// Protected routes (admin only)
// GET all contact submissions (admin only)
router.get('/', adminAuth, getAllContacts);

// PUT update contact status (admin only)
router.put('/:id/status', adminAuth, updateContactStatus);

export default router;
