import { AppDataSource } from '../config/database';
import { Employee } from '../entities/Employee';
import { Admin } from '../entities/Admin';
import { SickLeave } from '../entities/SickLeave';
import { SickLeaveStatus } from '../types';
import bcrypt from 'bcrypt';

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const employeeRepo = AppDataSource.getRepository(Employee);
    const adminRepo = AppDataSource.getRepository(Admin);
    const sickLeaveRepo = AppDataSource.getRepository(SickLeave);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await sickLeaveRepo.clear();
    await employeeRepo.clear();
    await adminRepo.clear();

    // Create Admin user
    console.log('👤 Creating admin user...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const admin = adminRepo.create({
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@company.com',
      password: hashedAdminPassword,
    });
    await adminRepo.save(admin);
    console.log('✅ Admin created: admin@company.com / admin123');

    // Create 10 Employees
    console.log('👥 Creating 10 employees...');
    const employees: Employee[] = [];
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const positions = [
      'Software Engineer',
      'Senior Developer',
      'Marketing Manager',
      'Sales Representative',
      'HR Specialist',
      'Financial Analyst',
      'Product Manager',
      'UX Designer',
      'Data Analyst',
      'DevOps Engineer',
    ];

    for (let i = 1; i <= 10; i++) {
      const hashedPassword = await bcrypt.hash(`employee${i}`, 10);
      const employee = employeeRepo.create({
        firstName: firstNames[i - 1],
        lastName: lastNames[i - 1],
        email: `employee${i}@company.com`,
        password: hashedPassword,
        position: positions[i - 1],
        department: departments[i % departments.length],
        hireDate: new Date(2020 + (i % 4), i % 12, (i * 3) % 28 || 1),
      });
      await employeeRepo.save(employee);
      employees.push(employee);
      console.log(`✅ Employee ${i} created: employee${i}@company.com / employee${i}`);
    }

    // Create sample sick leaves for some employees
    console.log('🏥 Creating sample sick leaves...');
    const statuses: SickLeaveStatus[] = [
      SickLeaveStatus.PENDING,
      SickLeaveStatus.APPROVED,
      SickLeaveStatus.REJECTED,
      SickLeaveStatus.PENDING,
      SickLeaveStatus.APPROVED,
    ];

    for (let i = 0; i < 5; i++) {
      const employee = employees[i];
      const sickLeave = sickLeaveRepo.create({
        employeeId: employee.id,
        startDate: new Date(2026, 0, 5 + i * 2),
        endDate: new Date(2026, 0, 7 + i * 2),
        reason: `Medical checkup and treatment - Sample ${i + 1}`,
        status: statuses[i],
      });
      await sickLeaveRepo.save(sickLeave);
      console.log(`✅ Sick leave created for ${employee.firstName} ${employee.lastName} (${sickLeave.status})`);
    }

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log(`   - 1 Admin: admin@company.com / admin123`);
    console.log(`   - 10 Employees: employee1@company.com / employee1 ... employee10@company.com / employee10`);
    console.log(`   - 5 Sample sick leaves with different statuses\n`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seed completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}
