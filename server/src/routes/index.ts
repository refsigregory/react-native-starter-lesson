import { Router } from 'express';
import authRoutes from './auth.routes';
import employeeRoutes from './employee.routes';
import adminRoutes from './admin.routes';
import sickLeaveRoutes from './sickLeave.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/admins', adminRoutes);
router.use('/sick-leaves', sickLeaveRoutes);

export default router;
