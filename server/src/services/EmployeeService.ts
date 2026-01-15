import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { UpdateEmployeeDto } from '../dto/auth.dto';
import { PaginationParams, PaginatedResponse } from '../types';
import { Employee } from '../entities/Employee';

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async getAllEmployees(params: PaginationParams): Promise<PaginatedResponse<Partial<Employee>>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const [employees, total] = await this.employeeRepository.findAll(skip, limit);
    
    return {
      data: employees,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    if (dto.email && dto.email !== employee.email) {
      const existingEmployee = await this.employeeRepository.findByEmail(dto.email);
      if (existingEmployee) {
        throw new Error('Email already exists');
      }
    }

    const updateData: any = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      department: dto.department,
      position: dto.position,
    };

    if (dto.hireDate) {
      updateData.hireDate = new Date(dto.hireDate);
    }

    const updatedEmployee = await this.employeeRepository.update(id, updateData);
    return updatedEmployee;
  }

  async deleteEmployee(id: number) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    await this.employeeRepository.delete(id);
  }

  async toggleEmployeeStatus(id: number) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    const updatedEmployee = await this.employeeRepository.update(id, {
      isActive: !employee.isActive,
    });
    return updatedEmployee;
  }
}
