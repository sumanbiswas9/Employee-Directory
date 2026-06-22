# Employee Directory

A full-stack Employee Directory application for managing employee records with search and filtering.

This project is organized as two apps in one workspace:

- `Employee-Directory-Backend`: Spring Boot REST API with PostgreSQL
- `Employee-Directory-Frontend`: React + Vite web UI

---

## Project Overview

The application allows you to:

- View all employees
- Search employees by keyword (name/department)
- Filter employees by department, role, and position
- Add a new employee
- Update an existing employee

---

## Tech Stack

### Backend

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- Lucide React icons

---

## Repository Structure

```text
EmployeeDirectory/
├── Employee-Directory-Backend/
│   ├── pom.xml
│   └── src/main/java/com/Suman/Employee_Directory/
│       ├── Controller/
│       ├── Service/
│       ├── Repository/
│       ├── Entity/
│       └── DTO/
└── Employee-Directory-Frontend/
  ├── package.json
  └── src/
    ├── components/
    ├── pages/
    ├── services/
    └── utils/
```

---

## Prerequisites

Install these tools before running the project:

- Java 21+
- Maven 3.9+
- Node.js 20+
- npm 10+
- PostgreSQL 14+

---

## Quick Start (Beginner Friendly)

Follow these steps in order.

### 1) Clone and open the workspace

```bash
git clone <your-repository-url>
cd EmployeeDirectory
```

### 2) Create the PostgreSQL database

Open PostgreSQL and run:

```sql
CREATE DATABASE EmployeeDirectory;
```

### 3) Configure backend database credentials

In `Employee-Directory-Backend/src/main/resources/application.yaml`, update:

- `spring.datasource.username`
- `spring.datasource.password`

If your PostgreSQL is not on localhost:5432, also update:

- `spring.datasource.url`

### 4) Run the backend

```bash
cd Employee-Directory-Backend
mvn spring-boot:run
```

Backend default URL: `http://localhost:8080`

### 5) Run the frontend

Open a second terminal:

```bash
cd Employee-Directory-Frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

---

## Frontend Configuration

The frontend API base URL is read from:

- `VITE_BASE_URL` environment variable

Fallback default in code:

- `http://localhost:8080/api/employees`

You can create `Employee-Directory-Frontend/.env` with:

```env
VITE_BASE_URL=http://localhost:8080/api/employees
```

---

## API Endpoints

Base path: `/api/employees`

- `GET /api/employees`
  - Get all employees
- `GET /api/employees/{id}`
  - Get employee by ID
- `POST /api/employees`
  - Create employee
- `PUT /api/employees/{id}`
  - Update employee
- `GET /api/employees/search?keyword=<text>`
  - Search by keyword
- `GET /api/employees/filter?department=<d>&role=<r>&position=<p>`
  - Filter by optional query parameters

### Employee Payload (Create/Update)

```json
{
  "name": "John Doe",
  "role": "Manager",
  "department": "Engineering",
  "position": "Software Engineer",
  "email": "john.doe@example.com",
  "phone": "9876543210"
}
```

---

## Useful Commands

### Backend

```bash
cd Employee-Directory-Backend
mvn test
mvn verify
```

### Frontend

```bash
cd Employee-Directory-Frontend
npm run dev
npm run build
npm run preview
npm run lint
```

---

## CORS Notes

- Backend includes CORS setup to allow frontend access during local development.
- Frontend is expected to run on `http://localhost:5173`.

---

## Troubleshooting

### Backend cannot connect to database

- Confirm PostgreSQL service is running.
- Verify database name, username, and password in `application.yaml`.
- Confirm port `5432` (or update URL if different).

### Frontend cannot call API

- Ensure backend is running on port `8080`.
- Verify `VITE_BASE_URL` value (if configured).
- Check browser console and backend logs for CORS or network errors.

### Port already in use

- Stop old processes using ports `8080` or `5173`.
- Or run frontend/backend on different ports and update configuration.

---

## Security and Production Notes

This repository is currently configured for local development.

Before production use, make sure to:

- Move database credentials out of source files and into environment variables or a secrets manager.
- Restrict CORS origins to trusted frontend domains.
- Add request validation and stronger error handling.
- Add authentication and authorization.
- Add CI checks, tests, and deployment configuration.

---

## Future Improvements

- Delete employee endpoint
- Pagination and sorting
- Better server-side filtering in repository/query layer
- Unit and integration tests for backend and frontend
- Docker setup for one-command local startup

---

## License

Add your preferred license here (for example: MIT).
