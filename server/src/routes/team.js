import express from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
// GET all team members
router.get('/', getAllTeamMembers);

// GET team member by ID
router.get('/:id', getTeamMemberById);

// Protected routes (admin only)
// POST a new team member
router.post('/', adminAuth, createTeamMember);

// UPDATE a team member
router.put('/:id', adminAuth, updateTeamMember);

// DELETE a team member
router.delete('/:id', adminAuth, deleteTeamMember);

export default router;
