# HomeLogger

HomeLogger is a home maintenance tracker inspired by LubeLogger. It's a full-stack web application with a Next.js React frontend and Go Fiber backend using SQLite database.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Build the Repository:
- `cd server && go mod download` -- Downloads Go dependencies (typically 1-2 seconds)
- `cd server && mkdir -p data/db data/uploads` -- Create required directories for database and file uploads
- `cd server && go build -o main ./cmd/server` -- **NEVER CANCEL: Build takes 1-50 seconds depending on cache. ALWAYS set timeout to 90+ minutes for safety.**
- `cd client && npm install` -- **NEVER CANCEL: Install takes 15-30 seconds. Set timeout to 60+ minutes.**
- `cd client && NEXT_PUBLIC_SERVER_URL=http://localhost:8083 npm run build` -- **NEVER CANCEL: Build takes 15-25 seconds. Set timeout to 60+ minutes.**

### Run the Application in Development:
- **ALWAYS run the bootstrapping steps first.**
- **Server**: `cd server && ./main` -- Starts on port 8083, serves API endpoints directly (no /api prefix)
- **Client**: `cd client && NEXT_PUBLIC_SERVER_URL=http://localhost:8083 npm run dev` -- Starts on port 3000
- **CRITICAL**: The client requires `NEXT_PUBLIC_SERVER_URL` environment variable. Without it, the build will fail with "NEXT_PUBLIC_SERVER_URL environment variable is not set, and is required."

### Linting:
- Client: `cd client && npm run lint` -- Runs ESLint (typically 1-2 seconds). **Note: Shows deprecation warning about `next lint` being deprecated in Next.js 16, but still works correctly.**
- Server: No linting configuration exists

## Validation

### Manual Validation Scenarios:
**ALWAYS test these user scenarios after making changes:**

1. **Basic Server Functionality**:
   - Start server: `cd server && ./main`
   - Test health check: `curl http://localhost:8083/` should return "Hello, World"
   - Test empty todo list: `curl http://localhost:8083/todo` should return `[]`

2. **Complete Todo Workflow**:
   - Create todo: `curl -X POST -H "Content-Type: application/json" -d '{"label":"Test item","checked":false,"userid":"1"}' http://localhost:8083/todo/add`
   - Verify creation: `curl http://localhost:8083/todo` should show the created item
   - Access client at `http://localhost:3000/todo` and verify todo appears in UI

3. **Client-Server Integration**:
   - Start both server and client (with correct NEXT_PUBLIC_SERVER_URL)
   - Navigate to `http://localhost:3000` -- should show HomeLogger homepage
   - Navigate to `http://localhost:3000/todo` -- should show todo interface
   - Navigate to `http://localhost:3000/appliances` -- should show appliances interface

### Production Docker Validation:
- The application is designed to run with Docker Compose
- In production, nginx proxies `/api/*` requests to the Go server and strips the `/api` prefix
- Static files are served directly by nginx

## Architecture and API Communication

### Client-Server Communication:
- **Development**: Client expects server at `NEXT_PUBLIC_SERVER_URL` (without /api). Client code automatically adds `/api` prefix to all requests.
- **Production**: nginx.conf handles routing `/api/*` to the backend server and removes the `/api` prefix
- **API Endpoints**: All server endpoints are defined without `/api` prefix (e.g., `/todo`, `/maintenance`, `/repair`)

### Database:
- SQLite database automatically created at `server/data/db/homelogger.db`
- GORM handles automatic migrations on startup
- Models include: Todo, Appliance, Maintenance, Repair, SavedFile

## Common Tasks

### Repository Structure:
```
/
├── client/          # Next.js React frontend
├── server/          # Go Fiber backend  
├── docker-compose.yml # Production deployment config
└── .github/         # GitHub templates (no CI/CD workflows)
```

### Client Structure (Next.js):
```
client/
├── components/      # React components (MaintenanceSection, RepairSection, etc.)
├── pages/          # Next.js pages (index, todo, appliances, appliance)
├── package.json    # Node.js dependencies and scripts
├── Dockerfile      # Production build container
└── nginx.conf      # Nginx config for production routing
```

### Server Structure (Go):
```
server/
├── cmd/server/     # Main application entry point
├── internal/
│   ├── database/   # Database operations and GORM setup
│   └── models/     # Data models (Todo, Appliance, etc.)
├── go.mod         # Go dependencies
└── Dockerfile     # Production build container
```

### Key Dependencies:
- **Client**: Next.js 15.4.7, React 18, Bootstrap 5, TypeScript 5
- **Server**: Go 1.23+, Fiber v2, GORM, SQLite driver
- **Required**: Node.js 20+, Go 1.23+

### Build Artifacts:
- `server/main` -- Compiled Go binary (excluded from commits)
- `client/.next/` -- Next.js build output
- `client/out/` -- Static export output
- `server/data/` -- Database and uploads directory

## Critical Timing Information

**NEVER CANCEL builds or long-running commands**:
- Go build: 1-50 seconds (varies with cache, set timeout to 90+ minutes minimum)
- npm install: 15-30 seconds (set timeout to 60+ minutes minimum)  
- npm build: 15-25 seconds (set timeout to 60+ minutes minimum)

**Testing Infrastructure**:
- No automated test suite exists for either client or server
- Validation must be done manually using the scenarios above
- No GitHub Actions workflows configured

## Environment Variables

### Required for Client:
- `NEXT_PUBLIC_SERVER_URL` -- Base URL of the server (e.g., `http://localhost:8083`)

### Optional:
- `NEXT_TELEMETRY_DISABLED=1` -- Disables Next.js telemetry (used in Docker builds)

## Common Issues

1. **Build fails with "NEXT_PUBLIC_SERVER_URL environment variable is not set"**:
   - Solution: Always set `NEXT_PUBLIC_SERVER_URL=http://localhost:8083` when building or running the client

2. **Client can't connect to server APIs**:
   - Verify server is running on port 8083
   - Verify `NEXT_PUBLIC_SERVER_URL` is set correctly
   - Remember: client adds `/api` prefix, server doesn't serve under `/api` in development

3. **Database errors on first run**:
   - Ensure `server/data/db` directory exists
   - GORM will automatically create and migrate the database on first run