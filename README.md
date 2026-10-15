# Full-Stack Personal Portfolio Website

A modern, production-grade Full-Stack Personal Portfolio engineered for a Computer Science & Engineering graduate/student. Built with **React 19**, **TypeScript**, **Node.js / Express**, and **MySQL**, featuring a clean architectural aesthetic, interactive code consoles, verified skill matrices, dynamic project showcase, printable PDF resume, and an authenticated administrative dashboard.

---

## 🌟 Key Features

1. **Hero & Professional Introduction**:
   - Availability status indicator with real-time heartbeat.
   - Interactive terminal window with live script inspection (`profile.json`, `schema.sql`, `status.sh`).
   - Quick metric counters (projects, LeetCode solved count, CGPA, hackathon honors).
   - Instant social connections (GitHub, LinkedIn, LeetCode, Email).

2. **About Me**:
   - Personal journey narrative, academic trajectory, and career goals.
   - 4 Core Engineering Pillars: Full-Stack Architecture, Relational Database Rigor, Core CS Foundations, and Engineering Craft.
   - Verified academic credentials table.

3. **Technical Skills Inventory**:
   - Categorized by Programming Languages, Frontend, Backend, Databases, DevOps & Tools, and Core CS Fundamentals.
   - Interactive live keyword search and category filters.
   - Visual proficiency meters and practical implementation tags.

4. **Projects Showcase & Interactive Star Counter**:
   - Category filters: Full Stack, Distributed Systems, AI & Tools, Mobile / Web.
   - Real-time project star/like button connected to backend API (`POST /api/projects/:id/star`).
   - **Deep Dive Architecture Modal**: Displays architectural tradeoffs, database tables used, concurrency notes, and performance metrics.
   - Direct GitHub repository and live demonstration links.

5. **Academic Background & Education**:
   - B.E. in Computer Science and Engineering with CGPA standing.
   - Key coursework (DSA, DBMS, OS, Computer Networks, System Design).
   - Academic milestones and departmental technical leadership.

6. **Certifications & Credentials**:
   - Industry credentials from AWS, Meta, Oracle, and Google Cloud.
   - Credential ID one-click copy and third-party verification links.
   - Interactive digital certificate preview modal.

7. **Honors & Achievements**:
   - National Smart India Hackathon 1st Place winner breakdown.
   - LeetCode Knight profile (1894 rating, 550+ solved).
   - Inter-collegiate speed debugging gold medal.
   - Active open-source contributions.

8. **Printable Curriculum Vitae / Resume**:
   - Clean, ATS-friendly resume formatted directly on the page.
   - One-click **Print / Save as PDF** using optimized `@media print` styling (omits navbars and dark backgrounds for clean paper/PDF export).

9. **Interactive Contact Form & Submissions Database**:
   - Name, Email, Subject, and Message fields.
   - Dual-tier validation: real-time client-side checks and strict server-side sanitization against XSS.
   - Contact messages stored in the database with timestamps and status tracking.

10. **Protected Admin Management Portal**:
    - Secure password-authenticated modal interface.
    - View and manage contact messages (mark as read, replied, or deleted).
    - Add new projects with title, slug, summary, tech stack, and links.
    - System health monitor and one-click database re-seed button.

---

## 🗄️ Database Architecture (MySQL)

The application includes `schema.sql` ready to import into any MySQL 8.0+ server:

- `profile`: Stores headline, bio, contact details, CGPA, and availability.
- `skills`: Categorized skill items, proficiency levels (0-100), and tags.
- `projects`: Engineering projects with JSON tech arrays, GitHub/demo URLs, and stars.
- `education`: Academic degrees, institutions, and coursework.
- `certifications`: Professional licenses and verification links.
- `achievements`: Hackathon wins, ranks, and dates.
- `contact_messages`: Visitor contact submissions with status and IP hashes.
- `admins`: Hashed credentials for administrative authentication.

### Local Development Mode
The database layer (`src/server/db.ts`) provides an intelligent dual-engine architecture:
- If `MYSQL_HOST` or `DATABASE_URL` is configured, it connects to MySQL via `mysql2/promise` using parameterized queries.
- If MySQL is not yet configured, it automatically uses an embedded local JSON store (`data/portfolio_data.json`), ensuring **zero runtime crashes or setup barriers** during initial evaluation!

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

If connecting to MySQL:
```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=portfolio_db
```

### 3. Initialize MySQL Database (Optional)
If running a local MySQL server:
```bash
mysql -u root -p < schema.sql
```

### 4. Running the Application
Start the full-stack development server (Express API + Vite React):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Unit Tests
Execute the native Node test runner:
```bash
npm test
```

---

## 🔐 Admin Portal Credentials

- **Username**: `admin`
- **Password**: `admin123`

*(You can update the admin credentials via `src/server/db.ts` or directly in the `admins` MySQL table using `hashPassword`)*

---

## 🌐 Production Deployment Guide

### Option A: Monolithic Deployment (Render, Railway, or VPS)
Both frontend and Express backend can run in a single container or Node instance:
1. Build the production React assets:
   ```bash
   npm run build
   ```
2. Start the Express server:
   ```bash
   npm start
   ```
3. Set your production environment variables (`MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, etc.) in the hosting control panel.

### Option B: Decoupled Deployment
- **Frontend (Vercel / Netlify)**:
  - Framework preset: Vite
  - Build command: `npm run build`
  - Output directory: `dist`
  - Set `VITE_API_BASE_URL` to point to your backend.
- **Backend (Render / Railway / Fly.io)**:
  - Command: `tsx server.ts` or compiled `node server.js`
  - Attach a managed MySQL database instance.
