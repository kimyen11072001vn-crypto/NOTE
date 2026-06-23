# NOTE - Project Structure

## Overview
NOTE is a monorepo using npm workspaces with separate frontend and backend packages.

## Directory Structure

```
NOTE/
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── index.ts          # Server entry point
│   │   │   ├── routes/           # API routes
│   │   │   ├── controllers/      # Route handlers
│   │   │   ├── services/         # Business logic
│   │   │   ├── models/           # Database models (Prisma)
│   │   │   ├── middleware/       # Express middleware
│   │   │   ├── utils/            # Utility functions
│   │   │   └── types/            # TypeScript types
│   │   ├── prisma/
│   │   │   ├── schema.prisma     # Database schema
│   │   │   └── migrations/       # Database migrations
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/       # React components
│       │   ├── pages/            # Page components
│       │   ├── hooks/            # Custom React hooks
│       │   ├── stores/           # Zustand state management
│       │   ├── services/         # API client services
│       │   ├── types/            # TypeScript types
│       │   ├── utils/            # Utility functions
│       │   ├── App.tsx           # Root component
│       │   └── main.tsx          # Entry point
│       ├── public/               # Static assets
│       ├── Dockerfile
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── package.json
│
├── docs/                         # Documentation
├── docker-compose.yml            # Docker compose setup
├── package.json                  # Root package.json
└── README.md
```

## Key Technologies

### Backend
- **Express.js** - Web framework
- **Prisma** - ORM and database migrations
- **PostgreSQL** - Database
- **Socket.io** - Real-time communication
- **TypeScript** - Type-safe development
- **OpenAI API** - AI comment generation

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Zustand** - State management
- **React Router** - Routing

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/kimyen11072001vn-crypto/NOTE.git
cd NOTE
```

2. Install dependencies
```bash
npm install
npm install -w packages/backend
npm install -w packages/frontend
```

3. Setup environment variables
```bash
cp packages/backend/.env.example packages/backend/.env
```

4. Setup database
```bash
cd packages/backend
npm run prisma:migrate
```

5. Run development servers
```bash
npm run dev
```

### Docker Setup

```bash
docker-compose up
```

This will start:
- PostgreSQL on port 5432
- Backend API on port 5000
- Frontend on port 3000

## Development Workflow

### Working on Backend
```bash
cd packages/backend
npm run dev
```

### Working on Frontend
```bash
cd packages/frontend
npm run dev
```

### Database Migrations
```bash
cd packages/backend
prisma migrate dev --name <migration_name>
```

### Prisma Studio (Database GUI)
```bash
cd packages/backend
npm run prisma:studio
```

## API Structure

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

### Users
- `GET /api/users/me`
- `PUT /api/users/:id`

### Classes
- `GET /api/classes`
- `POST /api/classes`
- `GET /api/classes/:id`
- `PUT /api/classes/:id`
- `DELETE /api/classes/:id`

### Students
- `GET /api/classes/:classId/students`
- `POST /api/classes/:classId/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`
- `POST /api/students/import` (Excel import)

### Feedback
- `POST /api/feedback`
- `GET /api/feedback/student/:studentId`
- `PUT /api/feedback/:id`
- `DELETE /api/feedback/:id`
- `POST /api/feedback/ai-generate` (AI comment generation)

### Attendance
- `POST /api/attendance`
- `GET /api/attendance/student/:studentId`
- `PUT /api/attendance/:id`

### Reports
- `GET /api/reports/student/:studentId/pdf`
- `GET /api/reports/student/:studentId/excel`
- `GET /api/reports/class/:classId/pdf`

## WebSocket Events

### Client to Server
- `feedback:update` - Real-time feedback update
- `attendance:update` - Attendance change

### Server to Client
- `feedback:updated` - Feedback update confirmation
- `attendance:updated` - Attendance update confirmation

## Testing

```bash
# Backend tests
cd packages/backend
npm test

# Frontend tests
cd packages/frontend
npm test
```

## Deployment

### Production Build
```bash
npm run build
```

### Docker Production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```
