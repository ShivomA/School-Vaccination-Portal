# School Vaccination Portal

A full-stack web application for managing and tracking vaccination drives in schools. It helps school coordinators maintain student records, schedule vaccination drives, update vaccination statuses, and generate reports.

This is a full-stack application designed to manage vaccination drives and student data. The project is divided into two main parts: the **Backend** (Node.js) and the **Frontend** (React).

## Features

- 📋 Student records management
- 📅 Vaccination drive scheduling
- ✅ Update and track vaccination status
- 📊 Generate reports and summaries
- 🔐 Secure and responsive interface

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Communication**: RESTful APIs

---

## Prerequisites

- **Node.js** should be installed. If it's not installed, please [download and install Node.js](https://nodejs.org/).

---

## Getting Started

### Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the backend server in development mode:

   ```bash
   npm run dev
   ```

   This will start the backend server. You can now access the backend API at `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Start the frontend web application:

   ```bash
   npm run start
   ```

   This will start the frontend React application on `http://localhost:3000`.

---

## Project Structure

- **Backend**: The backend is built using Node.js with Express and MongoDB. It handles authentication, CRUD operations for students and vaccination drives, and provides RESTful APIs.
- **Frontend**: The frontend is built using React. It interacts with the backend via API calls to display data related to students, vaccination drives, and reports.
