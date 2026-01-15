import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Admin } from '../entities/Admin';

export class AdminRepository {
  private repository: Repository<Admin>;

  constructor() {
    this.repository = AppDataSource.getRepository(Admin);
  }

  async create(adminData: Partial<Admin>): Promise<Admin> {
    const admin = this.repository.create(adminData);
    return await this.repository.save(admin);
  }

  async findAll(skip = 0, take = 10): Promise<[Admin[], number]> {
    return await this.repository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
      select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: number): Promise<Admin | null> {
    return await this.repository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async update(id: number, updateData: Partial<Admin>): Promise<Admin | null> {
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
