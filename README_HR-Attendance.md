# HR Attendance Management System

A full-stack employee attendance management application built to manage daily attendance, leave requests, and attendance reports in one place.

The repository is organized into a React frontend and a Node.js/Express backend.

## Features

### Attendance Management
- Record employee attendance with check-in and check-out.
- View attendance records and attendance history.
- Filter attendance records by a selected date range.
- Export attendance reports to **CSV** or **Excel (`.xlsx`)**.
- Choose a **From** and **To** date when generating a report, so the exported file covers the selected period.

### Leave Requests
- Submit leave requests.
- View and track leave request status.
- Review leave requests through the relevant management workflow.

### Web Application
- React and TypeScript frontend.
- Responsive interface styled with Tailwind CSS and shadcn/ui.
- REST API powered by Node.js and Express.

> Note: Exact permissions and leave approval rules depend on the roles and workflows implemented in the application.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling / UI | Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express.js |
| API | REST API |
| Reports | CSV and Excel (`.xlsx`) export |

## Project Structure

```text
HR-Attendance/
├── frontend/   # React + TypeScript application
└── backend/    # Node.js + Express API
```

## Getting Started

### Prerequisites

Install the following before running the application:

- Node.js (use a version supported by the project's `package.json`)
- npm
- The database required by the backend configuration

### 1. Clone the repository

```bash
git clone https://github.com/hizkiasiahaandev/HR-Attendance.git
cd HR-Attendance
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create the backend environment file based on the environment variables expected by the backend code (for example, copy `.env.example` to `.env` if the repository provides one). Configure the database connection and any required secrets.

Start the backend using the development script defined in `backend/package.json`. In this project, the backend is expected to run at:

```text
http://localhost:3000
```

For example, if the package defines a `dev` script:

```bash
npm run dev
```

Keep this terminal running.

### 3. Configure the frontend

Open another terminal from the repository root:

```bash
cd frontend
npm install
```

Configure the frontend API base URL if the project uses an environment variable. Make sure it points to the backend at `http://localhost:3000`.

Start the Vite development server:

```bash
npm run dev
```

The frontend is expected to run at:

```text
http://localhost:5173
```

If a port is already in use, Vite may select another available port unless configured otherwise.

## Attendance Report Export

The report workflow supports selecting a date range:

1. Open the attendance/report page.
2. Select the **From** date.
3. Select the **To** date.
4. Apply the date range to the report.
5. Export the filtered records as CSV or Excel (`.xlsx`).

Check the exported file before using it for official reporting to confirm that the selected date range and displayed filters match the intended report.

## Development Notes

- Keep backend secrets and database credentials in environment variables.
- Do not commit `.env` files, credentials, or generated sensitive attendance data.
- Validate date ranges on both the frontend and backend.
- Ensure report exports use the same filters as the records displayed in the application.

## Author

**Hizkia Siahaan**

- GitHub: [@hizkiasiahaandev](https://github.com/hizkiasiaandev)
- Repository: [HR-Attendance](https://github.com/hizkiasiaandev/HR-Attendance)
