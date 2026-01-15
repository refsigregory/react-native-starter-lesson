import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { AdminRepository } from '../repositories/AdminRepository';
import { RegisterEmployeeDto, LoginDto, ChangePasswordDto } from '../dto/auth.dto';
import { config } from '../config/env';
import { UserRole, AuthTokenPayload } from '../types';

export class AuthService {
  private employeeRepository: EmployeeRepository;
  private adminRepository: AdminRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.adminRepository = new AdminRepository();
  }

  async registerEmployee(dto: RegisterEmployeeDto) {
    const existingEmployee = await this.employeeRepository.findByEmail(dto.email);
    if (existingEmployee) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const employee = await this.employeeRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone,
      department: dto.department,
      position: dto.position,
      hireDate: dto.hireDate ? new Date(dto.hireDate) : undefined,
    });

    const { password, ...employeeWithoutPassword } = employee;
    return employeeWithoutPassword;
  }

  async loginEmployee(dto: LoginDto) {
    const employee = await this.employeeRepository.findByEmail(dto.email);
    if (!employee) {
      throw new Error('Invalid credentials');
    }

    if (!employee.isActive) {
      throw new Error('Account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, employee.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload: AuthTokenPayload = {
      id: employee.id,
      email: employee.email,
      role: UserRole.EMPLOYEE,
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    const { password, ...employeeWithoutPassword } = employee;
    return { user: employeeWithoutPassword, token };
  }

  async loginAdmin(dto: LoginDto) {
    const admin = await this.adminRepository.findByEmail(dto.email);
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new Error('Account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload: AuthTokenPayload = {
      id: admin.id,
      email: admin.email,
      role: UserRole.ADMIN,
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    const { password, ...adminWithoutPassword } = admin;
    return { user: adminWithoutPassword, token };
  }

  async changePassword(userId: number, dto: ChangePasswordDto, role: UserRole) {
    const repository = role === UserRole.EMPLOYEE ? this.employeeRepository : this.adminRepository;
    const user = role === UserRole.EMPLOYEE 
      ? await this.employeeRepository.findByEmail((await this.employeeRepository.findById(userId))?.email || '')
      : await this.adminRepository.findByEmail((await this.adminRepository.findById(userId))?.email || '');

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await repository.updatePassword(userId, hashedPassword);
  }

  verifyToken(token: string): AuthTokenPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as AuthTokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
