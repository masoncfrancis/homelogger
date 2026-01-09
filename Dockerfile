# Stage 1: Build the Next.js app
FROM node:22-alpine AS client-builder

WORKDIR /client

# Install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm ci --silent

# Copy the rest of the application code
COPY client/ .

ARG NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app (expects build to produce `out` or the static export)
RUN npm run build

# Stage 2: Build the Go binary
FROM golang:1-alpine AS server-builder

RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy go mod and sum files
COPY go.mod ./

# Download dependencies
RUN go mod download

# Copy the source
COPY . .

ENV CGO_ENABLED=1
RUN go build -o main ./cmd/server

# Stage 3: Final image based on Alpine, running nginx + the Go server
FROM alpine:latest

RUN apk add --no-cache ca-certificates nginx

# Copy the built static site (from client build). If your Next.js build exports static files
# they should be in /client/out; adjust if your build places them elsewhere.
COPY --from=client-builder /client/out /usr/share/nginx/html

# Use the project's nginx config if present (adjust path if needed)
COPY client/combo-nginx.conf /etc/nginx/nginx.conf

# Copy the Go binary
COPY --from=server-builder /app/main /usr/local/bin/main
RUN chmod +x /usr/local/bin/main

# Expose ports (80 for nginx, 8083 for Go service)
EXPOSE 80 8083

# Start the Go server in background, then run nginx in foreground
CMD /usr/local/bin/main & exec nginx -g 'daemon off;'
