import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Employee } from './Employee';
import { SickLeaveStatus } from '../types';

@Entity('sick_leaves')
export class SickLeave {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  employeeId!: number;

  @ManyToOne(() => Employee, (employee) => employee.sickLeaves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employeeId' })
  employee!: Employee;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({ type: 'text' })
  reason!: string;

  @Column({ type: 'text', nullable: true })
  medicalCertificate?: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: SickLeaveStatus.PENDING,
  })
  @Index()
  status!: SickLeaveStatus;

  @Column({ type: 'text', nullable: true })
  adminComment?: string;

  @Column({ nullable: true })
  reviewedBy?: number;

  @Column({ type: 'datetime', nullable: true })
  reviewedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
