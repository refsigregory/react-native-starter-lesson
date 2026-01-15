import bcrypt from 'bcrypt';
import { AdminRepository } from '../repositories/AdminRepository';
import { CreateAdminDto, UpdateAdminDto } from '../dto/admin.dto';
import { PaginationParams, PaginatedResponse } from '../types';
import { Admin } from '../entities/Admin';

export class AdminService {
  private adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async createAdmin(dto: CreateAdminDto) {
    const existingAdmin = await this.adminRepository.findByEmail(dto.email);
    if (existingAdmin) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const admin = await this.adminRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const { password, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  async getAllAdmins(params: PaginationParams): Promise<PaginatedResponse<Partial<Admin>>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const [admins, total] = await this.adminRepository.findAll(skip, limit);

    return {
      data: admins,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAdminById(id: number) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  }

  async updateAdmin(id: number, dto: UpdateAdminDto) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new Error('Admin not found');
    }

    if (dto.email && dto.email !== admin.email) {
      const existingAdmin = await this.adminRepository.findByEmail(dto.email);
      if (existingAdmin) {
        throw new Error('Email already exists');
      }
    }

    const updatedAdmin = await this.adminRepository.update(id, dto);
    return updatedAdmin;
  }

  async deleteAdmin(id: number) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new Error('Admin not found');
    }

    await this.adminRepository.delete(id);
  }
}
