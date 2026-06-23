FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY packages/backend/package*.json ./
COPY packages/backend/prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npm run prisma:generate

# Copy source code
COPY packages/backend/src ./src
COPY packages/backend/tsconfig.json ./

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
