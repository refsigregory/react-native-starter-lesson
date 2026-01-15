import { SickLeaveRepository } from '../repositories/SickLeaveRepository';
import { CreateSickLeaveDto, UpdateSickLeaveDto, ReviewSickLeaveDto } from '../dto/sickLeave.dto';
import { PaginationParams, PaginatedResponse, SickLeaveStatus } from '../types';
import { SickLeave } from '../entities/SickLeave';

export class SickLeaveService {
  private sickLeaveRepository: SickLeaveRepository;

  constructor() {
    this.sickLeaveRepository = new SickLeaveRepository();
  }

  async createSickLeave(employeeId: number, dto: CreateSickLeaveDto) {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (startDate > endDate) {
      throw new Error('Start date must be before end date');
    }

    const sickLeave = await this.sickLeaveRepository.create({
      employeeId,
      startDate,
      endDate,
      reason: dto.reason,
      medicalCertificate: dto.medicalCertificate,
      status: SickLeaveStatus.PENDING,
    });

    return sickLeave;
  }

  async getAllSickLeaves(params: PaginationParams): Promise<PaginatedResponse<SickLeave>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const [sickLeaves, total] = await this.sickLeaveRepository.findAll(skip, limit);

    return {
      data: sickLeaves,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSickLeavesByEmployee(employeeId: number, params: PaginationParams): Promise<PaginatedResponse<SickLeave>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const [sickLeaves, total] = await this.sickLeaveRepository.findByEmployeeId(employeeId, skip, limit);

    return {
      data: sickLeaves,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSickLeavesByStatus(status: SickLeaveStatus, params: PaginationParams): Promise<PaginatedResponse<SickLeave>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const [sickLeaves, total] = await this.sickLeaveRepository.findByStatus(status, skip, limit);

    return {
      data: sickLeaves,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSickLeaveById(id: number) {
    const sickLeave = await this.sickLeaveRepository.findById(id);
    if (!sickLeave) {
      throw new Error('Sick leave not found');
    }
    return sickLeave;
  }

  async updateSickLeave(id: number, employeeId: number, dto: UpdateSickLeaveDto) {
    const sickLeave = await this.sickLeaveRepository.findById(id);
    if (!sickLeave) {
      throw new Error('Sick leave not found');
    }

    if (sickLeave.employeeId !== employeeId) {
      throw new Error('Unauthorized to update this sick leave');
    }

    if (sickLeave.status !== SickLeaveStatus.PENDING) {
      throw new Error('Can only update pending sick leaves');
    }

    const updateData: Partial<SickLeave> = {};
    if (dto.startDate) updateData.startDate = new Date(dto.startDate);
    if (dto.endDate) updateData.endDate = new Date(dto.endDate);
    if (dto.reason) updateData.reason = dto.reason;
    if (dto.medicalCertificate !== undefined) updateData.medicalCertificate = dto.medicalCertificate;

    if (updateData.startDate && updateData.endDate && updateData.startDate > updateData.endDate) {
      throw new Error('Start date must be before end date');
    }

    const updatedSickLeave = await this.sickLeaveRepository.update(id, updateData);
    return updatedSickLeave;
  }

  async deleteSickLeave(id: number, employeeId: number) {
    const sickLeave = await this.sickLeaveRepository.findById(id);
    if (!sickLeave) {
      throw new Error('Sick leave not found');
    }

    if (sickLeave.employeeId !== employeeId) {
      throw new Error('Unauthorized to delete this sick leave');
    }

    if (sickLeave.status !== SickLeaveStatus.PENDING) {
      throw new Error('Can only delete pending sick leaves');
    }

    await this.sickLeaveRepository.delete(id);
  }

  async reviewSickLeave(id: number, adminId: number, dto: ReviewSickLeaveDto) {
    const sickLeave = await this.sickLeaveRepository.findById(id);
    if (!sickLeave) {
      throw new Error('Sick leave not found');
    }

    if (sickLeave.status !== SickLeaveStatus.PENDING) {
      throw new Error('Sick leave has already been reviewed');
    }

    const reviewedSickLeave = await this.sickLeaveRepository.reviewSickLeave(
      id,
      dto.status,
      adminId,
      dto.adminComment
    );
    return reviewedSickLeave;
  }
}
