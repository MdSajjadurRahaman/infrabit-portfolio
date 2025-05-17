import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
// GET all projects
router.get('/', getAllProjects);

// GET featured projects
router.get('/featured', getFeaturedProjects);

// GET project by ID
router.get('/:id', getProjectById);

// Protected routes (admin only)
// POST a new project
router.post('/', adminAuth, createProject);

// UPDATE a project
router.put('/:id', adminAuth, updateProject);

// DELETE a project
router.delete('/:id', adminAuth, deleteProject);

export default router;
