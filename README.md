# KWASU Student Portal Redesign

A modern, role-based student portal for Kwara State University, built as a Turborepo monorepo with a focus on intuitive UI/UX, real-time updates, and seamless campus life integration.

---

## 📖 Project Description

The existing KWASU student portal suffers from a dated, cluttered interface and a one-size-fits-all experience that fails to serve the diverse needs of students, class representatives, lecturers, and administrators. This project is a full redesign and rebuild of the portal into a fast, personalised, and unified hub for all academic and administrative activities.

Key improvements include:

- A **redesigned public homepage** with dynamic stats, featured lecturers, Vice Chancellor's message, best graduating students, campus media, and news.
- A **role‑based dashboard** that adapts to the logged‑in user (student, class rep, assistant rep, lecturer, etc.), exposing only relevant tools.
- **Real‑time notifications** via Socket.io for course updates, announcements, timetable changes, and more.
- **Smart timetable** generation that filters the school‑wide schedule down to a student's registered courses.
- **Streamlined navigation** organised into logical groups, with quick access to finances, academics, campus services, and communication.
- **Class rep tools** that let representatives post supervised announcements and manage WhatsApp group links.
- **Integrated blog, news feed, campus radio, and gallery** to bring the KWASU community together online.

---

## ✨ Features

### Public Pages (Pre‑login)

- **Homepage** – Key stats, Vice Chancellor's profile, recognised lecturers, best graduating students, beautiful campus views.
- **News & Blog** – University announcements, student stories, and articles.
- **Campus Radio** – Embedded live stream player.
- **Admissions** – Information for prospective students.
- **About / Contact** – University history, departments, and contact details.

### Dashboard (After Login)

#### Core Navigation (Role‑aware)

- **Home** – Personalised overview: recent grades, next class, fee status, announcements.
- **My Academics** – Registered courses, timetable, results, transcript, LMS/CBT access.
- **Communication** – Announcements feed, notifications panel, class WhatsApp links (rep‑managed).
- **Finances** – Fee balance, payment receipts, invoices, transaction validation.
- **Services** – Hostel accommodation, on‑demand clearance, SIWES, programme change requests, elections, support tickets.
- **Rate Lecturer** – Anonymous feedback on teaching quality.
- **Profile & Settings** – Update personal info, password, notification preferences.

#### Role‑Specific Features

| Role                          | Extra Tools                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| **Student**                   | Default view, all standard features.                                                |
| **Class Rep / Assistant Rep** | Post announcements (pending adviser approval), manage class WhatsApp link.          |
| **Level Adviser**             | Review and approve/reject rep announcements, view class lists.                      |
| **Lecturer**                  | Upload course materials, mark attendance, post assignments, view anonymous ratings. |
| **Exam Officer**              | Upload master timetable, publish results.                                           |
| **Bursary**                   | Manage fees, invoices, validate transactions, generate reports.                     |
| **Student Affairs**           | Handle SIWES, clearance, hostel allocation, elections, support tickets.             |
| **Super Admin**               | Manage all users, roles, sessions, academic calendar, audit logs.                   |

### Real‑time Notifications

Instant alerts for:

- New course materials / assignments
- Result publication
- Announcement approval or rejection
- Timetable update
- Fee reminders
- Class cancellation (rep action)
- Customisable sound and visual indicators.

### Smart Timetable

- Automatically extracts a personal weekly view from the school's master timetable based on your registered courses.
- Colour‑coded schedule card with time, venue, and lecturer details.

---

## 🛠 Tech Stack

| Layer                       | Technology                                                      |
| --------------------------- | --------------------------------------------------------------- |
| **Monorepo**                | Turborepo with pnpm workspaces                                  |
| **Client (Student Portal)** | Next.js 15 (App Router), React, Tailwind CSS                    |
| **Admin Panel**             | Next.js 15 (App Router), React, Tailwind CSS                    |
| **API Server**              | **Express.js** (REST + WebSocket)                               |
| **Real‑time**               | **Socket.io**                                                   |
| **Database**                | **MongoDB** with Mongoose ODM                                   |
| **Authentication**          | Better Auth (role‑based JWT, refresh tokens)                    |
| **State Management**        | **Zustand** (client state) + TanStack Query (server state)      |
| **Validation**              | **Zod** (shared schemas)                                        |
| **File Storage**            | Cloudinary                                                      |
| **Caching**                 | Redis (Upstash) – session store, rate limiting, timetable cache |
| **Testing**                 | Vitest + Playwright                                             |
| **CI/CD**                   | GitHub Actions (planned)                                        |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Vincentvirtuoso/kwasu-portal.git
cd kwasu-portal

# 2. Install dependencies (requires pnpm)
pnpm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run database seed (optional)
pnpm db:seed

# 5. Start all apps in dev mode
pnpm dev

# Apps will start on:
# Client  → http://localhost:3000
# Admin   → http://localhost:3001
# Server  → http://localhost:4000
```

---

## 📆 Development Plan (Day‑by‑Day)

This plan assumes a **90‑day timeline** with one developer or a small team. It breaks the project into weekly phases, with daily tasks focused on deliverable increments.

### Phase 1: Foundation & Setup (Week 1–2)

| Day | Task                                                                                                                                           | Deliverable                     |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| 1   | Set up Turborepo monorepo, pnpm workspaces, shared tsconfig. Configure ESLint & Prettier.                                                      | Clean repo structure.           |
| 2   | Initialize `apps/server` with Express + TypeScript. Add Socket.io, MongoDB connection, and basic middleware.                                   | Server runs on port 4000.       |
| 3   | Define Mongoose schemas for User, Course, Announcement, etc. (based on `packages/types`). Create initial TypeScript enums in `packages/types`. | Core data models ready.         |
| 4   | Build auth routes (register, login, refresh token) using Better Auth + JWT.                                                                    | Auth endpoints working.         |
| 5   | Implement role‑based middleware and protect a test route.                                                                                      | Role‑gated access confirmed.    |
| 6   | Set up `apps/client` Next.js app. Create layout with Tailwind, basic routing, and login page.                                                  | Student portal scaffold.        |
| 7   | Wire client login form to server, store JWT in Zustand + httpOnly cookie.                                                                      | Successful authentication flow. |

### Phase 2: Core Student Features (Week 3–5)

| Day   | Task                                                                                            | Deliverable                            |
| ----- | ----------------------------------------------------------------------------------------------- | -------------------------------------- |
| 8     | Design and implement the public homepage with static data (stats, VC message).                  | Homepage visible at `/`.               |
| 9     | Add Blog & News pages with dummy content from Express API.                                      | `/news`, `/blog` pages.                |
| 10    | Build student dashboard shell (sidebar + topbar) based on user role.                            | Role‑aware navigation.                 |
| 11    | Implement course registration (list available courses, register).                               | Student can register for courses.      |
| 12    | Create timetable page – fetch master timetable, filter by registered courses, display as grid.  | Personalised timetable view.           |
| 13    | Develop notifications panel – mark read, show recent events. Use Socket.io to emit test events. | Real‑time notification badge + drawer. |
| 14    | Integrate Ratings feature – submit anonymous rating, view own history.                          | Rating form + summary page.            |
| 15    | Finance section: fee status, receipt list, invoice generation (basic mock data).                | Student sees finance overview.         |
| 16–20 | Continue building remaining student pages (results, SIWES, clearance, etc.) with mock API data. | All student routes functional.         |

### Phase 3: Class Rep & Adviser Workflows (Week 6)

| Day | Task                                                                                                     | Deliverable                  |
| --- | -------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 21  | Rep announcement creation form (with draft state). Post to server with `pending` status.                 | Rep can submit announcement. |
| 22  | Adviser dashboard: queue of pending announcements, approve/reject. Emit notification to rep on decision. | Approval workflow complete.  |
| 23  | WhatsApp link management by rep – add, edit, delete link. Students see link on dashboard.                | Quick link visible to class. |

### Phase 4: Admin Panel (Week 7–8)

| Day   | Task                                                                                    | Deliverable                     |
| ----- | --------------------------------------------------------------------------------------- | ------------------------------- |
| 24    | Scaffold `apps/admin`, login, role‑based routing.                                       | Admin panel accessible.         |
| 25–30 | Build lecturer views: upload materials (Cloudinary), post assignments, mark attendance. | Full lecturer workflow.         |
| 31–35 | Exam officer: timetable upload (CSV parsing), result publication with CGPA computation. | Timetable + results management. |
| 36–40 | Bursary, Student Affairs, Super Admin dashboards.                                       | All admin roles functional.     |

### Phase 5: Realtime & Polish (Week 9–10)

| Day   | Task                                                                                           | Deliverable                  |
| ----- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| 41    | Finalise Socket.io event handlers – tie every server action to a notification.                 | All notifications live.      |
| 42    | Add Redis caching for timetable and session store.                                             | Faster responses.            |
| 43    | Implement rate limiting on auth and sensitive endpoints.                                       | Security hardening.          |
| 44    | Write unit tests (Vitest) for utils, services, and validators.                                 | >80% coverage on server.     |
| 45    | Write E2E tests (Playwright) for critical user journeys (login → dashboard → register course). | Automated regression tests.  |
| 46    | UI polish: loading skeletons, empty states, error handling, responsive tweaks.                 | Production‑ready feel.       |
| 47–50 | Documentation (README, API docs), environment variable guide, deployment prep.                 | Ready for production review. |

### Phase 6: Deployment & Handover (Week 11–12)

| Day   | Task                                                                                               |
| ----- | -------------------------------------------------------------------------------------------------- |
| 51–55 | Set up CI/CD pipeline, deploy client and admin to Vercel (or similar), server to a cloud provider. |
| 56–60 | User acceptance testing, final bug fixes, performance audits.                                      |

---

## 📁 Project Structure

```
kwasu-portal/
├── apps/
│   ├── client/          # Student portal (Next.js 15)
│   ├── admin/           # Admin & Lecturer panels (Next.js 15)
│   └── server/          # REST + WebSocket API (Express.js)
├── packages/
│   ├── ui/              # Shared React components & design system
│   ├── types/           # TypeScript interfaces & enums
│   └── utils/           # Zod schemas, formatters, helpers
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome. Please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

**Made for the KWASU community.**
