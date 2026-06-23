import { Router } from 'express';
import classController from '../controllers/classController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create class
router.post('/', (req, res) => classController.createClass(req, res));

// Get all classes for teacher
router.get('/', (req, res) => classController.getClasses(req, res));

// Get specific class
router.get('/:classId', (req, res) => classController.getClassById(req, res));

// Update class
router.put('/:classId', (req, res) => classController.updateClass(req, res));

// Delete class
router.delete('/:classId', (req, res) => classController.deleteClass(req, res));

export default router;
