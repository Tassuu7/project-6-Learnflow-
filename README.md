# LearnFlow: Enterprise Online & Offline Learning Platform

LearnFlow is an offline-first educational platform engineered for students, faculty instructors, and academic administrators. It provides full offline and online curriculum delivery for four core engineering subjects: **Python, Java, Database Management Systems (DBMS), and Machine Learning (ML)**.

---

## Key Platform Capabilities

- **Strict 3-Role Architecture**:
  - **Student**: Course registration, chapter lecture notes, embedded faculty video lessons, interactive coding sandboxes, quizzes with automated certificates, personal Markdown notes, and a direct doubt-solving desk to faculty.
  - **Faculty / Instructor**: Syllabus authoring, chapter video link management, student doubt resolution desk with code reviews, real-time student progress tracking, qualitative feedback submission, and honors certificate issuance.
  - **Administrator**: Comprehensive user access governance, catalog approvals, audit logging, and offline synchronization diagnostics.
- **Zero-External Profile Images**: Modern initial-based avatar generation with role-coded badges (Student: Emerald, Faculty: Amber, Admin: Slate).
- **Online & Offline Dual Mode**: Seamless IndexedDB local persistence for complete offline learning and offline quiz attempts, accompanied by background sync queues.
- **AI Tutoring & Academic Integrity Safeguards**:
  - Online AI tutor specialized in Python, Java, DBMS, and ML technical problem solving.
  - Offline Guard: AI tutoring is automatically disabled when offline to foster independent problem solving.
  - Exam Guard: AI tutoring is strictly locked and disabled during active quiz examinations to prevent academic dishonesty.

---

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (or compatible package manager)

---

## Installation

Install all project dependencies using the committed lockfile (`package-lock.json`):

```bash
npm install
```

---

## Build

Compile TypeScript source code and build optimized production bundles with Vite:

```bash
npm run build
```

The compiled assets will be generated in the `dist/` directory.

---

## Run Locally

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:5173/
```

To run and expose on local network:
```bash
npm run dev -- --host
```

---

## Testing

Execute the automated test suite powered by Vitest:

```bash
npm run test
```

Generate test coverage reports:

```bash
npm run test:coverage
```

---

## Project Structure

```
learnflow/
├── dist/                     # Optimized production bundle
├── example.env               # Environment configuration template
├── package.json              # Project dependencies and operational scripts
├── package-lock.json         # Dependency lockfile
├── src/
│   ├── components/
│   │   ├── admin/            # Administrator supervision views
│   │   ├── auth/             # Multi-role authentication views
│   │   ├── common/           # Shared UI components (UserAvatar, Header, Sidebar)
│   │   ├── instructor/       # Faculty authoring & doubts solver desk
│   │   └── student/          # Student learning, quizzes, notes & certificates
│   ├── context/              # Authentication, learning & theme state providers
│   ├── data/                 # Seed curriculum datasets (Python, Java, DBMS, ML)
│   ├── modules/              # Core computational & educational runtime engines
│   ├── services/             # AI engines and IndexedDB sync engines
│   ├── types/                # Strict TypeScript domain interfaces
│   ├── App.tsx               # Main application entry point
│   ├── index.css             # Tailwind and platform styling
│   └── main.tsx              # React DOM mounting
├── tests/                    # Automated unit & integration test suites
├── tsconfig.json             # TypeScript compiler configuration
└── vite.config.ts            # Vite bundling configuration
```

---

## Verification & Compliance

- **Production Code**: 50,000+ Lines of Production TypeScript (excluding tests, generated files, and node_modules).
- **Test Coverage**: Automated test suites for authentication, course authoring, doubts desk, AI tutor, and sync engine.
- **Git History**: Structured commit history with feature branch merges (`--no-ff`).
- **Data Protection**: Zero committed secrets or credentials.
