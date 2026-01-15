import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { SickLeave } from '../entities/SickLeave';
import { SickLeaveStatus } from '../types';

export class SickLeaveRepository {
  private repository: Repository<SickLeave>;

  constructor() {
    this.repository = AppDataSource.getRepository(SickLeave);
  }

  async create(sickLeaveData: Partial<SickLeave>): Promise<SickLeave> {
    const sickLeave = this.repository.create(sickLeaveData);
    return await this.repository.save(sickLeave);
  }

  async findAll(skip = 0, take = 10): Promise<[SickLeave[], number]> {
    return await this.repository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
      relations: ['employee'],
    });
  }

  async findById(id: number): Promise<SickLeave | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['employee'],
    });
  }

  async findByEmployeeId(employeeId: number, skip = 0, take = 10): Promise<[SickLeave[], number]> {
    return await this.repository.findAndCount({
      where: { employeeId },
      skip,
      take,
      order: { createdAt: 'DESC' },
      relations: ['employee'],
    });
  }

  async findByStatus(status: SickLeaveStatus, skip = 0, take = 10): Promise<[SickLeave[], number]> {
    return await this.repository.findAndCount({
      where: { status },
      skip,
      take,
      order: { createdAt: 'DESC' },
      relations: ['employee'],
    });
  }

  async update(id: number, updateData: Partial<SickLeave>): Promise<SickLeave | null> {
    await this.repository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async reviewSickLeave(
    id: number,
    status: SickLeaveStatus,
    adminId: number,
    adminComment?: string
  ): Promise<SickLeave | null> {
    await this.repository.update(id, {
      status,
      reviewedBy: adminId,
      reviewedAt: new Date(),
      adminComment,
    });
    return await this.findById(id);
  }
}
