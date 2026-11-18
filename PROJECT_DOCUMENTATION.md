# Shipyard Project Documentation

## Overview

Shipyard is a project management application built as a monorepo using Turborepo. It provides organization, board, section, issue, and comment management capabilities similar to tools like Trello or Jira.

## Tech Stack

- **Package Manager**: Bun 1.4.0
- **Build System**: Turborepo 2.10.11
- **Runtime**: Bun (preferred over Node.js per project rules)
- **Language**: TypeScript 5.9.2
- **Database**: PostgreSQL with Prisma ORM 7.9.1
- **Backend**: Express.js 5.2.1
- **Frontend**: Next.js 16.3.4 with React 19.2.8
- **WebSocket**: ws 8.21.3
- **Validation**: Zod 4.5.4
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7.4

## Project Structure

```
shipyard/
├── apps/
│   ├── backend/          # Express.js REST API server
│   ├── frontend/         # Next.js web application
│   └── websocket/        # WebSocket server (currently minimal)
├── packages/
│   ├── db/               # Prisma database client and schema
│   ├── eslint-config/    # Shared ESLint configurations
│   ├── typescript-config/# Shared TypeScript configurations
│   ├── ui/               # Shared React UI components
│   └── validation/       # Shared Zod validation schemas
├── turbo.json            # Turborepo configuration
└── package.json          # Root package.json
```

## Packages Overview

### Root Package (`shipyard`)

**Scripts:**
- `bun run build` - Build all apps and packages
- `bun run dev` - Start all apps in development mode
- `bun run lint` - Lint all apps and packages
- `bun run format` - Format code with Prettier
- `bun run check-types` - Type check all apps and packages

**Dependencies:**
- `turbo` ^2.10.11
- `prettier` ^3.7.4
- `typescript` 5.9.2

### Apps

#### `backend` - Express.js API Server

**Port:** 3001 (configurable via PORT env var)

**Dependencies:**
- `express` ^5.2.1
- `db` (workspace package)
- `validation` (workspace package)
- `zod` ^4.5.4
- `@types/express` ^5.0.6

**Structure:**
```
backend/
├── controllers/          # Request handlers
│   ├── board.controller.ts
│   ├── comment.controller.ts
│   ├── issue.controller.ts
│   ├── organization.controller.ts
│   └── section.controller.ts
├── middleware/           # Express middleware
│   ├── error-handler.ts
│   └── validation.middleware.ts
├── routes/              # Route definitions
│   ├── board.route.ts
│   ├── comment.route.ts
│   ├── issue.route.ts
│   ├── organization.route.ts
│   └── section.route.ts
├── services/            # Business logic
│   ├── board.service.ts
│   ├── comment.service.ts
│   ├── issue.service.ts
│   ├── organization.service.ts
│   └── section.service.ts
└── index.ts             # Server entry point
```

**Features:**
- RESTful API with Express.js
- CORS enabled for frontend (localhost:3000)
- Request validation using Zod schemas
- Centralized error handling
- Nested resource routing

#### `frontend` - Next.js Web Application

**Port:** 3000 (default Next.js port)

**Dependencies:**
- `next` 16.3.4
- `react` 19.2.8
- `react-dom` 19.2.8
- `babel-plugin-react-compiler` 1.0.0
- `eslint-config-next` 16.3.4

**Structure:**
```
frontend/
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (auth)/      # Auth route group
│   │   ├── (onboarding)/# Onboarding route group
│   │   │   └── create-organization/
│   │   ├── (workspace)/ # Workspace route group
│   │   │   └── o/[orgId]/
│   │   │       └── b/[boardId]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── _components/     # React components
│   │   ├── board/
│   │   └── dashboard/
│   ├── lib/             # Utility libraries
│   │   └── api/         # API client functions
│   │       ├── boards.api.ts
│   │       └── organization.api.ts
│   └── root.url.ts      # Backend URL configuration
└── package.json
```

**Features:**
- Next.js 16 with App Router
- React 19 with React Compiler
- Server-side API calls with "server-only"
- Route groups for logical organization
- Dynamic routes for orgId and boardId

#### `websocket` - WebSocket Server

**Status:** Minimal implementation (placeholder)

**Dependencies:**
- `ws` ^8.21.3
- `db` (workspace package)
- `@types/ws` ^8.18.1

**Note:** Currently only contains a console.log. Intended for real-time features.

### Packages

#### `db` - Database Layer

**Dependencies:**
- `@prisma/client` ^7.9.1
- `@prisma/adapter-pg` ^7.9.1
- `pg` ^8.23.0
- `dotenv` ^17.4.2
- `prisma` ^7.9.1 (dev)
- `@types/pg` ^8.23.1 (dev)

**Structure:**
```
db/
├── prisma/
│   └── schema.prisma    # Prisma schema definition
├── generated/
│   └── prisma/          # Generated Prisma client
├── index.ts             # Prisma client export
├── prisma.config.ts     # Prisma configuration
└── package.json
```

**Features:**
- PostgreSQL database with Prisma ORM
- Driver adapter pattern with PrismaPg
- Environment-based configuration
- Generated client in `generated/prisma` directory

#### `validation` - Shared Validation Schemas

**Dependencies:**
- `zod` ^4.5.4

**Structure:**
```
validation/
├── schemas/
│   ├── board.schema.ts
│   ├── comment.schema.ts
│   ├── common.schema.ts
│   ├── issue.schema.ts
│   ├── organization.schema.ts
│   ├── section.schema.ts
│   └── index.ts
├── index.ts
└── package.json
```

**Schemas:**
- **common.schema.ts**: ID validation schemas and composite param schemas
- **organization.schema.ts**: createOrganizationSchema
- **board.schema.ts**: createBoardSchema, updateBoardSchema
- **section.schema.ts**: createSectionSchema, updateSectionSchema
- **issue.schema.ts**: createIssueSchema, updateIssueSchema
- **comment.schema.ts**: createCommentSchema, updateCommentSchema

#### `ui` - Shared React Components

**Dependencies:**
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `@repo/eslint-config` (workspace)
- `@repo/typescript-config` (workspace)

**Structure:**
```
ui/
├── src/
│   ├── button.tsx
│   ├── card.tsx
│   └── code.tsx
└── package.json
```

**Features:**
- Shared React component library
- Exported via glob pattern `./*` from `src/*.tsx`

#### `eslint-config` - Shared ESLint Configuration

**Exports:**
- `./base` - Base ESLint configuration
- `./next-js` - Next.js specific configuration
- `./react-internal` - React internal configuration

**Dependencies:**
- `eslint` ^9.39.1
- `typescript-eslint` ^8.50.0
- `eslint-config-prettier` ^10.1.1
- `eslint-plugin-react` ^7.37.5
- `eslint-plugin-react-hooks` ^5.2.0
- `eslint-plugin-turbo` ^2.7.1
- `@next/eslint-plugin-next` ^16.3.0

#### `typescript-config` - Shared TypeScript Configuration

**Purpose:** Shared TypeScript configurations for the monorepo

**Configurations:**
- `nextjs.json` - Next.js TypeScript config
- `react-library.json` - React library TypeScript config

## Database Structure

### Prisma Schema

**Database Provider:** PostgreSQL

**Models:**

#### User
```prisma
model User {
  userId    String @id @default(uuid())
  username  String @unique
  password  String
  memberships Membership[]
  issues      IssueMapping[]
  comments    Comment[]
}
```

#### Organization
```prisma
model Organization {
  orgId          String @id @default(uuid())
  orgName        String @unique
  orgDescription String?
  memberships    Membership[]
  boards         Board[]
}
```

#### Membership (Junction Table)
```prisma
model Membership {
  userId     String
  orgId      String
  memberType String
  user       User @relation(fields: [userId], references: [userId])
  organization Organization @relation(fields: [orgId], references: [orgId])
  @@id([userId, orgId])
}
```

#### Board
```prisma
model Board {
  boardId   String @id @default(uuid())
  boardName String
  orgId     String
  organization Organization @relation(fields: [orgId], references: [orgId])
  sections  Section[]
  issues    Issue[]
}
```

#### Section
```prisma
model Section {
  sectionId   String @id @default(uuid())
  sectionTitle String
  boardId     String
  board       Board @relation(fields: [boardId], references: [boardId])
  issues      Issue[]
}
```

#### Issue
```prisma
model Issue {
  issueId          String @id @default(uuid())
  issueName        String
  issueDescription String?
  boardId          String
  sectionId        String
  board            Board @relation(fields: [boardId], references: [boardId])
  section          Section @relation(fields: [sectionId], references: [sectionId])
  assignees        IssueMapping[]
  comments         Comment[]
}
```

#### IssueMapping (Junction Table for Issue Assignees)
```prisma
model IssueMapping {
  issueId String
  userId  String
  issue   Issue @relation(fields: [issueId], references: [issueId])
  user    User @relation(fields: [userId], references: [userId])
  @@id([issueId, userId])
}
```

#### Comment
```prisma
model Comment {
  commentId   String   @id @default(uuid())
  commentText String
  issueId     String
  userId      String
  createdAt   DateTime @default(now())
  issue       Issue @relation(fields: [issueId], references: [issueId], onDelete: Cascade)
  user        User @relation(fields: [userId], references: [userId])
}
```

### Relationships

- **User** ↔ **Organization**: Many-to-many via Membership
- **Organization** ↔ **Board**: One-to-many
- **Board** ↔ **Section**: One-to-many
- **Board** ↔ **Issue**: One-to-many
- **Section** ↔ **Issue**: One-to-many
- **Issue** ↔ **User**: Many-to-many via IssueMapping (assignees)
- **Issue** ↔ **Comment**: One-to-many
- **User** ↔ **Comment**: One-to-many

## API Endpoints

### Base URL
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`

### Organization Routes

**Base Path:** `/organization`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/organization` | Create organization | `{ orgName: string, orgDescription?: string }` |
| GET | `/organization` | Get all organizations | - |
| GET | `/organization/:orgId` | Get organization by ID | - |
| DELETE | `/organization/:orgId` | Delete organization | - |

### Board Routes

**Base Path:** `/organizations/:orgId/boards`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/organizations/:orgId/boards` | Create board | `{ boardName: string }` |
| GET | `/organizations/:orgId/boards` | Get all boards for organization | - |
| GET | `/organizations/:orgId/boards/:boardId` | Get board by ID | - |
| PATCH | `/organizations/:orgId/boards/:boardId` | Update board | `{ boardName?: string }` |
| DELETE | `/organizations/:orgId/boards/:boardId` | Delete board | - |

### Section Routes

**Base Path:** `/organizations/:orgId/boards/:boardId/sections`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/organizations/:orgId/boards/:boardId/sections` | Create section | `{ sectionTitle: string }` |
| GET | `/organizations/:orgId/boards/:boardId/sections` | Get all sections for board | - |
| GET | `/organizations/:orgId/boards/:boardId/sections/:sectionId` | Get section by ID | - |
| PATCH | `/organizations/:orgId/boards/:boardId/sections/:sectionId` | Update section | `{ sectionTitle?: string }` |
| DELETE | `/organizations/:orgId/boards/:boardId/sections/:sectionId` | Delete section | - |

### Issue Routes

**Base Path:** `/organizations/:orgId/boards/:boardId/issues`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/organizations/:orgId/boards/:boardId/issues` | Create issue | `{ issueName: string, issueDescription?: string, sectionId: string }` |
| GET | `/organizations/:orgId/boards/:boardId/issues` | Get all issues for board | - |
| GET | `/organizations/:orgId/boards/:boardId/issues/:issueId` | Get issue by ID | - |
| PATCH | `/organizations/:orgId/boards/:boardId/issues/:issueId` | Update issue | `{ issueName?: string, issueDescription?: string, sectionId?: string }` |
| DELETE | `/organizations/:orgId/boards/:boardId/issues/:issueId` | Delete issue | - |

### Comment Routes

**Base Path:** `/organizations/:orgId/boards/:boardId/issues/:issueId/comments`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/organizations/:orgId/boards/:boardId/issues/:issueId/comments` | Create comment | `{ commentText: string, userId: string }` |
| GET | `/organizations/:orgId/boards/:boardId/issues/:issueId/comments` | Get all comments for issue | - |
| GET | `/organizations/:orgId/boards/:boardId/issues/:issueId/comments/:commentId` | Get comment by ID | - |
| PATCH | `/organizations/:orgId/boards/:boardId/issues/:issueId/comments/:commentId` | Update comment | `{ commentText: string }` |
| DELETE | `/organizations/:orgId/boards/:boardId/issues/:issueId/comments/:commentId` | Delete comment | - |

## Validation Schemas

All validation is done using Zod schemas from the `validation` package.

### Common Schemas
- `idSchema`: Non-empty string
- `organizationIdSchema`: `{ orgId: string }`
- `boardIdSchema`: `{ boardId: string }`
- `organizationBoardIdSchema`: `{ orgId: string, boardId: string }`
- `sectionIdSchema`: `{ sectionId: string }`
- `issueIdSchema`: `{ issueId: string }`
- `commentIdSchema`: `{ commentId: string }`
- `organizationBoardSectionIdSchema`: `{ orgId: string, boardId: string, sectionId: string }`
- `organizationBoardIssueIdSchema`: `{ orgId: string, boardId: string, issueId: string }`
- `organizationBoardIssueCommentIdSchema`: `{ orgId: string, boardId: string, issueId: string, commentId: string }`

### Resource Schemas

**Organization:**
- `createOrganizationSchema`: `{ orgName: string, orgDescription?: string }`

**Board:**
- `createBoardSchema`: `{ boardName: string }`
- `updateBoardSchema`: `{ boardName?: string }` (at least one field required)

**Section:**
- `createSectionSchema`: `{ sectionTitle: string }`
- `updateSectionSchema`: `{ sectionTitle?: string }` (at least one field required)

**Issue:**
- `createIssueSchema`: `{ issueName: string, issueDescription?: string, sectionId: string }`
- `updateIssueSchema`: `{ issueName?: string, issueDescription?: string, sectionId?: string }` (at least one field required)

**Comment:**
- `createCommentSchema`: `{ commentText: string, userId: string }`
- `updateCommentSchema`: `{ commentText: string }`

## Development Setup

### Prerequisites
- Bun 1.4.0
- Node.js >= 18
- PostgreSQL database

### Installation

```bash
# Install dependencies
bun install

# Set up database environment variables
# Copy packages/db/.env.example to packages/db/.env and configure DATABASE_URL
```

### Database Setup

```bash
# Generate Prisma client
cd packages/db
bunx prisma generate

# Run migrations (if you have migration files)
bunx prisma migrate dev

# Or push schema changes directly (development only)
bunx prisma db push
```

### Running the Project

```bash
# Development mode (runs all apps)
bun run dev

# Or run specific apps
cd apps/backend && bun run index.ts
cd apps/frontend && bun run dev
cd apps/websocket && bun run index.ts
```

### Building

```bash
# Build all apps and packages
bun run build

# Build specific package
turbo build --filter=backend
```

### Linting and Type Checking

```bash
# Lint all
bun run lint

# Type check all
bun run check-types

# Format code
bun run format
```

## Important Notes

### Bun Usage
Per project rules, always use Bun instead of Node.js:
- `bun <file>` instead of `node <file>`
- `bun install` instead of `npm install`
- `bun run <script>` instead of `npm run <script>`
- `bunx <package>` instead of `npx <package>`

### CORS Configuration
Backend allows CORS from `http://localhost:3000` (frontend) for GET, POST, DELETE, and OPTIONS methods.

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `PORT`: Backend server port (default: 3001)
- Frontend uses `ROOT_URL` from `src/root.url.ts` for API calls

### Frontend API Integration
Frontend uses server-side API calls with `"server-only"` imports. API functions are in `src/lib/api/` directory.

## Future Enhancements

- Complete WebSocket server implementation for real-time updates
- Add authentication and authorization
- Implement user assignment to issues
- Add file attachments to issues
- Implement search and filtering
- Add organization member management
- Implement board templates
- Add activity logging
