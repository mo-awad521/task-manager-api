# 📌 Task Manager API

## Tech Stack

- **NestJS**
- **TypeORM**
- **MySQL**
- **JWT Authentication**
- **Swagger**
- **Migrations**

---

## Setup

```bash
npm install
```

## Create .env file:

```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

## Run migrations:

```bash
npm run build
npx typeorm migration:run
```

## Start:

```bash
npm run start:dev
```

## API Endpoints

### Auth

- POST /auth/register
- POST /auth/login
- Users
- GET /users/me
- PATCH /users/me

### Tasks

- POST /tasks
- GET /tasks
- GET /tasks/:id
- PATCH /tasks/:id
- DELETE /tasks/:id

## Features

- JWT authentication
- Role-based ownership
- Pagination & filtering
- Production-safe config
- Structured modular architecture
