import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { RegisterEmployeeDto, LoginDto, ChangePasswordDto } from '../dto/auth.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  registerEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(RegisterEmployeeDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const employee = await this.authService.registerEmployee(dto);
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      next(error);
    }
  };

  loginEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(LoginDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const result = await this.authService.loginEmployee(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(LoginDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      const result = await this.authService.loginAdmin(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(ChangePasswordDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})).flat() });
        return;
      }

      await this.authService.changePassword(req.user!.id, dto, req.user!.role);
      res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ success: true, data: req.user });
    } catch (error) {
      next(error);
    }
  };
}
