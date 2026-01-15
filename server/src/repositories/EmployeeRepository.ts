import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Employee } from '../entities/Employee';

export class EmployeeRepository {
  private repository: Repository<Employee>;

  constructor() {
    this.repository = AppDataSource.getRepository(Employee);
  }

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.repository.create(employeeData);
    return await this.repository.save(employee);
  }

  async findAll(skip = 0, take = 10): Promise<[Employee[], number]> {
    return await this.repository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
      select: ['id', 'firstName', 'lastName', 'email', 'phone', 'department', 'position', 'hireDate', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: number): Promise<Employee | null> {
    return await this.repository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'email', 'phone', 'department', 'position', 'hireDate', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async update(id: number, updateData: Partial<Employee>): Promise<Employee | null> {
    await this.repository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async updatePassword(id: number, hashedPassword: string): Promise<void> {
    await this.repository.update(id, { password: hashedPassword });
  }
}
