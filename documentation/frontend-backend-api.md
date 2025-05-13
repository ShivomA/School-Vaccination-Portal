# Frontend-Backend Interaction

The frontend and backend of this system communicate via RESTful API endpoints. The frontend is built using React and interacts with the backend (Node.js + Express) to fetch, update, and display data regarding students, vaccination drives, and vaccine doses. The communication occurs over HTTP, and the frontend uses `fetch` for making API requests.

## Data Flow:

1. **Add Student**: When the user adds a new student, the frontend sends a `POST` request to the backend with the student's data. The backend processes this and saves it in the MongoDB database.
2. **Mark as Vaccinated**: When a user marks a student as vaccinated, the frontend sends a `POST` request with the student's ID and vaccination details (vaccine name, vaccination date, drive ID). The backend updates the student’s vaccination history and decrements the available doses in the vaccination drive.

3. **Vaccination Drive Management**: The frontend displays vaccination drives and allows users to schedule drives. The frontend sends `GET`, `POST`, and `PUT` requests to manage vaccination drives.

4. **Fetching Data**: For displaying students, vaccination drives, and related details, the frontend sends `GET` requests to the backend, and the backend responds with the data needed to populate the UI.

---

# API Endpoints Overview

## 🔐 Auth API (`/api/auth`)

- **POST /login** – User login

## 📊 Dashboard API (`/api/dashboard`)

- **GET /** – Fetch dashboard data

## 👨‍🎓 Student API (`/api/students`)

- **GET /** – Get all students
- **POST /** – Add a new student
- **POST /bulk** – Add multiple students
- **PUT /:id** – Update student details
- **PUT /:id/vaccinate** – Mark student as vaccinated

## 💉 Vaccination Drive API (`/api/vaccination-drives`)

- **GET /** – Get all vaccination drives
- **GET /:id** – Get a specific drive by ID
- **POST /** – Create a new drive
- **PUT /:id** – Update drive details
- **GET /:id/students** – Get students associated with a drive

## 📄 Reports API (`/api/reports`)

- **GET /students** – Get student vaccination report
- **GET /vaccination-drives** – Get vaccination drive report

---

# Database Schemas

## 🧑‍🎓 **Student Model**

The `Student` model stores information about students who are part of the vaccination portal. Each student has attributes like their name, age, grade, gender, and vaccination history.

### Fields:

- **name**: (String, Required) The student's name.
- **age**: (Number, Required) The student's age.
- **grade**: (String, Required) The grade the student is in.
- **gender**: (String, Required) The student's gender, can be one of the following: "Male", "Female", or "Other".
- **vaccineTaken**: (Array of Objects) This stores the details of the vaccines taken by the student, including:
  - **vaccineName**: (String) The name of the vaccine.
  - **vaccinationDriveId**: (ObjectId) A reference to the vaccination drive the student participated in.
  - **vaccinationDate**: (Date) The date when the student received the vaccine.
- **lastUpdated**: (Date) The date the student record was last updated.

---

## 💉 **Vaccination Drive Model**

The `Vaccination Drive` model represents a vaccination drive event. It holds details about the drive, such as the vaccine name, the date of the drive, the location, and the list of students vaccinated.

### Fields:

- **driveName**: (String, Required) The name of the vaccination drive.
- **vaccineName**: (String, Required) The name of the vaccine being administered during the drive.
- **driveDate**: (Date, Required) The date when the vaccination drive is scheduled.
- **location**: (String, Required) The location where the vaccination drive is taking place.
- **applicableGrades**: (Array of Strings, Required) A list of grades that are eligible for the vaccination drive.
- **vaccinatedStudentIds**: (Array of ObjectIds) References to the students who have been vaccinated in this drive.
- **availableDoses**: (Number, Required) The total number of doses available for the drive.
- **lastUpdated**: (Date) The date the vaccination drive record was last updated.
