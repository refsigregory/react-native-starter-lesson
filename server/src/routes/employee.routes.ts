import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';

const router = Router();
const employeeController = new EmployeeController();

// Admin only routes
router.get('/', authenticate, authorizeAdmin, employeeController.getAllEmployees);
router.get('/:id', authenticate, authorizeAdmin, employeeController.getEmployeeById);
router.put('/:id', authenticate, authorizeAdmin, employeeController.updateEmployee);
router.delete('/:id', authenticate, authorizeAdmin, employeeController.deleteEmployee);
router.patch('/:id/toggle-status', authenticate, authorizeAdmin, employeeController.toggleEmployeeStatus);

export default router;
