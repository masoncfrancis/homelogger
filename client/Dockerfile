# Stage 1: Build the Next.js app
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

ARG NEXT_TELEMETRY_DEBUG=1

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the built app to the Nginx HTML directory
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 8083

# Use the provided nginx.conf file (mounted via Docker Compose)
CMD ["nginx", "-g", "daemon off;"]

