import { DataSource } from 'typeorm';
import { config } from './env';
import { Employee } from '../entities/Employee';
import { Admin } from '../entities/Admin';
import { SickLeave } from '../entities/SickLeave';

const { db } = config;

// Factory function to create DataSource based on database type
export const AppDataSource = new DataSource({
  type: db.type as any,
  host: db.type !== 'better-sqlite3' ? db.host : undefined,
  port: db.type !== 'better-sqlite3' ? db.port : undefined,
  username: db.type !== 'better-sqlite3' ? db.username : undefined,
  password: db.type !== 'better-sqlite3' ? db.password : undefined,
  database: db.type === 'better-sqlite3' ? db.sqlitePath : db.database,
  entities: [Employee, Admin, SickLeave],
  synchronize: config.env === 'development', // Disable in production
  logging: config.env === 'development',
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log(`✅ Database connected successfully (${db.type})`);
  } catch (error) {
    console.error('❌ Error during Data Source initialization:', error);
    throw error;
  }
};
