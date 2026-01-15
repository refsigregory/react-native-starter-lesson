import { Request, Response, NextFunction } from 'express';
import { SickLeaveService } from '../services/SickLeaveService';
import { CreateSickLeaveDto, UpdateSickLeaveDto, ReviewSickLeaveDto } from '../dto/sickLeave.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SickLeaveStatus } from '../types';

export class SickLeaveController {
  private sickLeaveService: SickLeaveService;

  constructor() {
    this.sickLeaveService = new SickLeaveService();
  }

  createSickLeave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateSickLeaveDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const sickLeave = await this.sickLeaveService.createSickLeave(req.user!.id, dto);
      res.status(201).json({ success: true, data: sickLeave });
    } catch (error) {
      next(error);
    }
  };

  getAllSickLeaves = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as SickLeaveStatus;

      let result;
      if (status) {
        result = await this.sickLeaveService.getSickLeavesByStatus(status, { page, limit });
      } else {
        result = await this.sickLeaveService.getAllSickLeaves({ page, limit });
      }

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getMySickLeaves = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.sickLeaveService.getSickLeavesByEmployee(req.user!.id, { page, limit });
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getSickLeaveById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const sickLeave = await this.sickLeaveService.getSickLeaveById(id);
      res.status(200).json({ success: true, data: sickLeave });
    } catch (error) {
      next(error);
    }
  };

  updateSickLeave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const dto = plainToClass(UpdateSickLeaveDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const sickLeave = await this.sickLeaveService.updateSickLeave(id, req.user!.id, dto);
      res.status(200).json({ success: true, data: sickLeave });
    } catch (error) {
      next(error);
    }
  };

  deleteSickLeave = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.sickLeaveService.deleteSickLeave(id, req.user!.id);
      res.status(200).json({ success: true, message: 'Sick leave deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  reviewSickLeave = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const dto = plainToClass(ReviewSickLeaveDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const sickLeave = await this.sickLeaveService.reviewSickLeave(id, req.user!.id, dto);
      res.status(200).json({ success: true, data: sickLeave });
    } catch (error) {
      next(error);
    }
  };
}
