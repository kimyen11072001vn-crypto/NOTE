# Development Guide

## Code Style

### TypeScript
- Use strict mode
- Define types for all function parameters and returns
- Use interfaces for objects
- Use enums for constants

### Naming Conventions
- camelCase for variables, functions, and file names (except components)
- PascalCase for classes, interfaces, and React components
- UPPER_CASE for constants

### File Structure

**Backend:**
```
src/
├── routes/           # Express route definitions
├── controllers/      # Route handlers
├── services/         # Business logic
├── middleware/       # Express middleware
├── utils/            # Helper functions
├── types/            # TypeScript types and interfaces
└── index.ts          # Server entry point
```

**Frontend:**
```
src/
├── components/       # Reusable components
├── pages/            # Full page components
├── hooks/            # Custom React hooks
├── stores/           # Zustand state
├── services/         # API clients
├── utils/            # Helper functions
├── types/            # TypeScript types
├── App.tsx
└── main.tsx
```

## Git Workflow

### Branches
- `main` - Production ready code
- `dev/...` - Development features
- `feature/...` - Feature branches
- `fix/...` - Bug fix branches

### Commit Messages
```
type(scope): subject

Body explaining the changes...
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Build, dependencies

Example:
```
feat(feedback): add AI comment generation

Implement OpenAI integration for automatic feedback generation
based on selected skills and performance levels.
```

## Environment Setup

### Backend .env
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/note_db
JWT_SECRET=your_secret_key
OPENAI_API_KEY=sk-...
CLIENT_URL=http://localhost:3000
```

### Frontend .env
```
VITE_API_URL=http://localhost:5000/api
```

## Testing

### Backend Tests
```bash
cd packages/backend
npm test
```

### Frontend Tests
```bash
cd packages/frontend
npm test
```

## Common Tasks

### Adding a New API Endpoint

1. Define the route in `src/routes/`
2. Create a controller in `src/controllers/`
3. Add service logic in `src/services/`
4. Add types in `src/types/`
5. Write tests

### Adding a New React Component

1. Create in `src/components/`
2. Use TypeScript for props
3. Add tests
4. Export from `src/components/index.ts`

### Running Database Migrations

```bash
cd packages/backend

# Create new migration
prisma migrate dev --name <migration_name>

# Reset database (development only)
prisma migrate reset

# Open Prisma Studio
prisma studio
```

## Debugging

### Backend
```bash
node --inspect dist/index.js
```
Then open `chrome://inspect` in Chrome.

### Frontend
Open Chrome DevTools (F12)

## Performance Tips

1. Use React.memo for expensive components
2. Use useCallback for event handlers
3. Implement code splitting with React.lazy
4. Use React Query for efficient data fetching
5. Optimize database queries with Prisma
6. Use pagination for large lists
7. Implement caching strategies

## Security Best Practices

1. Never commit secrets (.env files)
2. Validate input on both frontend and backend
3. Use HTTPS in production
4. Implement rate limiting
5. Use CSRF tokens for state-changing operations
6. Sanitize user input
7. Keep dependencies updated
8. Use security headers (CORS, CSP, etc.)
