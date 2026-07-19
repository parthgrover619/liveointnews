# Live Point News – PRD

## Original Problem Statement
Build a professional, fast, high-converting full-stack news website for **Live Point News**,
a digital news platform based in Theog, Shimla, Himachal Pradesh.

## Core Requirements
- Public pages: Home, News/Categories, About, Contact, Testimonials, Advertise, Privacy, Terms
- Admin Dashboard to manage news, users, and content
- Role-Based Access Control (Super Admin / Editor / Reporter)
- Team Collaboration: Reporters can create/edit any news but cannot delete
- Video support (YouTube embeds) in news articles
- Partners section, Reporters/Senior Reporters section
- QR code generation for Agent ID cards
- Google Maps integration for location
- Newsletter subscription (Resend integration – key provided by user earlier)

## Tech Stack
- Frontend: React + Tailwind + Shadcn UI (`/app/frontend`)
- Backend: FastAPI + Motor/PyMongo (`/app/backend/server.py`)
- Database: MongoDB
- Auth: JWT + bcrypt

## Data Models
- **News**: id, title, content, category, image_url, video_url, author_id, tags, status, views, created_at, updated_at
- **User/Reporter**: id, name, email, password_hash, phone, role, photo, district, id_number, address, status, created_at, updated_at

## Key Endpoints
- `POST /api/auth/login` – admin login
- `POST /api/auth/reporter/login` – reporter login
- `GET/POST/PUT/DELETE /api/news`
- `GET/POST/DELETE /api/admin/reporters`
- `PUT /api/admin/reporters/{id}/password` – owner resets a reporter password
- `PUT /api/admin/change-password` – owner changes own password

## Implemented (Timeline)
- Initial full-stack setup + all public pages
- Premium royal-blue theme, glassmorphism, 3D accents
- Google Maps embed, QR code page, YouTube video embed
- RBAC (Super Admin / Editor / Reporter), team collaboration mode
- Owner (Super Admin) password set to `LivePoint@Owner2026`
- 7 reporter accounts seeded (see `/app/memory/test_credentials.md`)
- **[Feb 2026]** Password management: Owner can reset any reporter's password (`AdminReporters.js` modal) and change own password (`AdminSettings.js` at `/admin/settings`, linked in sidebar). Both flows E2E-tested via curl.

## Backlog / Next
- P1: Verify Resend newsletter integration end-to-end
- P2: Validate production deployment on `livepointnews.com`
- P2: Remove stale "Test Credentials: admin@livepoint.in / admin123" block from `AdminLogin.js` (still shown on login page)
- P2: Optional refactor of `server.py` into modules as feature set grows

## Notes for Next Agent
- Owner: `admin@livepoint.in` / `LivePoint@Owner2026`
- All reporter creds in `/app/memory/test_credentials.md`
- Reporter passwords in DB are per-reporter (not the unified `Reporter@2026` mentioned in earlier handoff)
