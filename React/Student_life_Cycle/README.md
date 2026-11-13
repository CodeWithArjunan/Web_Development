# Maatram Student Lifecycle Portal

A React and Vite prototype for a single Maatram admissions workspace. It uses synthetic applicants and keeps demo state in the browser's local storage.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## Application areas

- **Foundation home:** entry point for student and administration workflows.
- **Student admission:** demo login, personal details, parent details, sibling details, education, review/submission, and a read-only student dashboard with six admission progress stages. Draft and submitted details are saved in local storage between pages.
- **Admission management:** overview, admission cycles, applications, document verification, staff review, shortlisted applicants, final approvals, admission history, audit logs, settings, and profile.

## Project structure

```text
src/
├── components/
│   ├── AdmissionManagement/       # Individual admin pages and shared shell
│   └── MaatramStudentAdmission/   # Student pages, shared form components
├── pages/Home.jsx
├── utils/downloadCsv.js
├── adminData.js                   # Synthetic demo records
├── App.jsx                        # Navigation and shared browser state
└── App.css                        # Shared three-colour design system
```

## Demo notes

Student sign-in is a front-end demo. After submission, the email used for sign-in must match the submitted application email. Applicant, cycle, profile, settings, audit, and student draft data persist in this browser only. This prototype has no server authentication, API, or database connection. Use synthetic information only.

Administrators can update the six progress stages from **Applications → Update progress**. The student dashboard reads those stages from the linked application record. Browser storage synchronization also notifies another open tab when an administrator changes a record. This is for the local prototype only; production access control and database-backed persistence require a server.
