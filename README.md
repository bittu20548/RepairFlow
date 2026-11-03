# RepairFlow 🔧

A multi-shop repair management SaaS for mobile and laptop repair businesses.

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 7
- **Frontend:** React, TypeScript, Tailwind CSS (planned)

## Features

- Shop management
- Customer CRUD
- Repair ticket management
- Repair status history
- Payment management
- Dashboard statistics
- Multi-shop database structure

## Project Structure

```text
repairflow/
├── server/
│   ├── prisma/
│   ├── generated/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── lib/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── prisma.config.ts
│   └── package.json
└── client/ (planned)
```

## Installation & Setup

```bash
# Clone repository
git clone YOUR_REPOSITORY_URL

# Enter backend directory
cd repairflow/server

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5050
DATABASE_URL="YOUR_NEON_DATABASE_URL"
```

## Useful Commands

```bash
# Start development server
npm run dev

# Generate Prisma Client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name migration_name

# Validate Prisma schema
npx prisma validate

# Open Prisma Studio
npx prisma studio
```

## API Base URL

```text
http://localhost:5050
```

## Development Status

- [x] Backend setup
- [x] PostgreSQL connection
- [x] Prisma database models
- [x] Shop and Customer APIs
- [x] Repair Ticket APIs
- [x] Repair Status History
- [x] Payment APIs
- [x] Dashboard API
- [x] API testing for remaining modules
- [x] Authentication & Authorization
- [x] Frontend development

---

**RepairFlow — Simplifying Repair Shop Management.**
