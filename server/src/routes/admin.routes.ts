import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';

const router = Router();
const adminController = new AdminController();

// Admin only routes
router.post('/', authenticate, authorizeAdmin, adminController.createAdmin);
router.get('/', authenticate, authorizeAdmin, adminController.getAllAdmins);
router.get('/:id', authenticate, authorizeAdmin, adminController.getAdminById);
router.put('/:id', authenticate, authorizeAdmin, adminController.updateAdmin);
router.delete('/:id', authenticate, authorizeAdmin, adminController.deleteAdmin);

export default router;
