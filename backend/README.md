# FastAPI Backend for HRMS

This is the backend API for the HRMS (Human Resource Management System) built with FastAPI and PostgreSQL.

## Features

- User authentication and authorization with role-based access control
- Employee management
- Leave management with approval workflow
- Attendance tracking
- Payroll management
- Performance reviews
- Training management
- Grievance handling
- Asset management

## Roles

- **Admin**: Full access to all features, can manage users and employees
- **HR**: Can manage employees, approve leaves, create payroll, performance reviews, trainings
- **Manager**: Can view employees in their department, approve leaves
- **Employee**: Can view their own data, apply for leaves, view payslips, etc.

## Setup

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string
   - Set a secure `SECRET_KEY`

3. **Database Setup:**
   - Create a PostgreSQL database
   - Run database migrations: `alembic upgrade head`
   - Seed initial data: `python -m app.seed`

4. **Start the Server:**
   ```bash
   python run.py
   ```
   Or using uvicorn directly:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation with Swagger UI.

## Default Users

After seeding, you can login with:

- **Admin**: username: `admin`, password: `admin123`
- **HR**: username: `hr`, password: `hr123`
- **Manager**: username: `manager`, password: `manager123`
- **Employee**: username: `employee`, password: `employee123`

## Deployment

For production deployment:

1. Set `DATABASE_URL` to your remote PostgreSQL instance
2. Use a production ASGI server like Gunicorn
3. Set appropriate environment variables
4. Configure CORS if needed for frontend integration
