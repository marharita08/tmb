# Task Management Boards

Task Management Boards is a web application that allows users to manage tasks using boards with multiple columns. Each board contains three columns: **To Do**, **In Progress**, and **Done**. Users can create, edit, delete, and drag tasks between columns for easy task management.

## Features

- Create and manage multiple boards
- Each board has three columns: To Do, In Progress, Done
- Create, edit, and delete tasks
- Drag and drop tasks between columns

## Technology Stack

- **Frontend:** TypeScript, React, Vite
- **Backend:** TypeScript, NestJS
- **Database:** PostgreSQL

## Environment Variables

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | URL of the backend API | http://localhost:3000 |

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Connection string for the database | postgres://user:password@localhost:5432/dbname |
| PORT | Port for the backend server to run on | 3000 |

## Local Setup

### Backend

1. Clone the repository: `git clone https://github.com/marharita08/tmb`
2. Navigate to the backend folder: `cd apps/backend`
3. Install dependencies: `npm install` or `yarn install`
4. Create a `.env` file in the backend folder and add the required variables
5. Generate Prisma client: `npx prisma generate`
6. Push Prisma schema to the database: `npx prisma db push`
7. Start the backend server: `npm run start:dev`

### Frontend

1. Navigate to the frontend folder: `cd apps/frontend`
2. Install dependencies: `npm install` or `yarn install`
3. Create a `.env` file in the frontend folder and add the required variables
4. Start the frontend application: `npm run dev`

### Accessing the App

- Open your browser and navigate to the frontend URL (e.g., http://localhost:5173)
