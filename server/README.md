# Employee Management System - Backend API

Enterprise-level Express TypeScript backend for Employee Management with Sick Leave functionality.

## Features

- ✅ **TypeScript** - Fully typed codebase
- ✅ **TypeORM** - ORM with multi-database support (SQLite, MySQL, PostgreSQL)
- ✅ **Authentication** - JWT-based auth for Employees and Admins
- ✅ **Authorization** - Role-based access control (RBAC)
- ✅ **Validation** - Request validation using class-validator
- ✅ **Security** - Helmet, CORS, Rate limiting
- ✅ **Logging** - Request/response logging with Morgan
- ✅ **Error Handling** - Centralized error handling
- ✅ **Best Practices** - Repository pattern, Service layer, DTOs

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: SQLite (default), MySQL, PostgreSQL
- **Authentication**: JWT + bcrypt
- **Validation**: class-validator, class-transformer

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Database connection
│   │   └── env.ts       # Environment variables
│   ├── controllers/     # Request handlers
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # TypeORM entities
│   ├── middleware/      # Custom middleware
│   ├── repositories/    # Data access layer
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Edit `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3000

# Database Configuration
DB_TYPE=sqlite              # Options: sqlite, mysql, postgres
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=employee_db
DB_SQLITE_PATH=./database.sqlite

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Database Configuration

### SQLite (Default)
```env
DB_TYPE=sqlite
DB_SQLITE_PATH=./database.sqlite
```

### MySQL
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=employee_db
```

### PostgreSQL
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=employee_db
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new employee
- `POST /api/auth/login/employee` - Employee login
- `POST /api/auth/login/admin` - Admin login
- `POST /api/auth/change-password` - Change password (authenticated)
- `GET /api/auth/me` - Get current user (authenticated)

### Employees (Admin only)
- `GET /api/employees` - List all employees (paginated)
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `PATCH /api/employees/:id/toggle-status` - Toggle employee status

### Admins (Admin only)
- `POST /api/admins` - Create new admin
- `GET /api/admins` - List all admins (paginated)
- `GET /api/admins/:id` - Get admin by ID
- `PUT /api/admins/:id` - Update admin
- `DELETE /api/admins/:id` - Delete admin

### Sick Leaves
- `POST /api/sick-leaves` - Create sick leave (employee)
- `GET /api/sick-leaves/my` - Get my sick leaves (employee)
- `GET /api/sick-leaves` - Get all sick leaves (admin)
- `GET /api/sick-leaves/:id` - Get sick leave by ID
- `PUT /api/sick-leaves/:id` - Update sick leave (employee)
- `DELETE /api/sick-leaves/:id` - Delete sick leave (employee)
- `PATCH /api/sick-leaves/:id/review` - Review sick leave (admin)

### Health Check
- `GET /health` - Server health check

## Request Examples

### Register Employee
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "department": "Engineering",
    "position": "Developer"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login/employee \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Sick Leave
```bash
curl -X POST http://localhost:3000/api/sick-leaves \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "startDate": "2026-01-20",
    "endDate": "2026-01-22",
    "reason": "Flu",
    "medicalCertificate": "cert-12345"
  }'
```

### Review Sick Leave (Admin)
```bash
curl -X PATCH http://localhost:3000/api/sick-leaves/1/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{
    "status": "approved",
    "adminComment": "Approved - get well soon"
  }'
```

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - class-validator for DTOs

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Success responses:

```json
{
  "success": true,
  "data": { ... }
}
```

## Pagination

List endpoints support pagination:

```
GET /api/employees?page=1&limit=10
```

Response includes metadata:

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typeorm` - Run TypeORM CLI

## License

ISC
