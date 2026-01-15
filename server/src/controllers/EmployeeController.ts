import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/EmployeeService';
import { UpdateEmployeeDto } from '../dto/auth.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.employeeService.getAllEmployees({ page, limit });
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const employee = await this.employeeService.getEmployeeById(id);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const dto = plainToClass(UpdateEmployeeDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const employee = await this.employeeService.updateEmployee(id, dto);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.employeeService.deleteEmployee(id);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  toggleEmployeeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const employee = await this.employeeService.toggleEmployeeStatus(id);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  };
}
