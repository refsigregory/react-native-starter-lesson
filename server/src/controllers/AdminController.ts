import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/AdminService';
import { CreateAdminDto, UpdateAdminDto } from '../dto/admin.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateAdminDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const admin = await this.adminService.createAdmin(dto);
      res.status(201).json({ success: true, data: admin });
    } catch (error) {
      next(error);
    }
  };

  getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.adminService.getAllAdmins({ page, limit });
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getAdminById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const admin = await this.adminService.getAdminById(id);
      res.status(200).json({ success: true, data: admin });
    } catch (error) {
      next(error);
    }
  };

  updateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const dto = plainToClass(UpdateAdminDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const admin = await this.adminService.updateAdmin(id, dto);
      res.status(200).json({ success: true, data: admin });
    } catch (error) {
      next(error);
    }
  };

  deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.adminService.deleteAdmin(id);
      res.status(200).json({ success: true, message: 'Admin deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
