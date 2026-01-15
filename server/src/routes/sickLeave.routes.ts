import { Router } from 'express';
import { SickLeaveController } from '../controllers/SickLeaveController';
import { authenticate, authorizeAdmin, authorizeEmployee } from '../middleware/auth.middleware';

const router = Router();
const sickLeaveController = new SickLeaveController();

// Employee routes
router.post('/', authenticate, authorizeEmployee, sickLeaveController.createSickLeave);
router.get('/my', authenticate, authorizeEmployee, sickLeaveController.getMySickLeaves);
router.put('/:id', authenticate, authorizeEmployee, sickLeaveController.updateSickLeave);
router.delete('/:id', authenticate, authorizeEmployee, sickLeaveController.deleteSickLeave);

// Admin routes
router.get('/', authenticate, authorizeAdmin, sickLeaveController.getAllSickLeaves);
router.get('/:id', authenticate, sickLeaveController.getSickLeaveById);
router.patch('/:id/review', authenticate, authorizeAdmin, sickLeaveController.reviewSickLeave);

export default router;
