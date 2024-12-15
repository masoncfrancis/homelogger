# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Use build argument to determine the environment
ARG BUILD_ENV=development
RUN if [ "$BUILD_ENV" = "production" ]; then \
        next build; \
    else \
        npm run dev; \
    fi

# Stage 2: Production stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3000
EXPOSE 3000

# Use build argument to determine the start command
ARG BUILD_ENV=development
CMD if [ "$BUILD_ENV" = "production" ]; then \
        npm start; \
    else \
        npm run dev; \
    fi