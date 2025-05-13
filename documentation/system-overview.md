# System Overview

## Purpose of the System

The **Vaccination Portal** is a web application designed to manage vaccination drives within a school or educational institution. The application helps in managing the scheduling of vaccination drives, maintaining a record of students eligible for vaccination, tracking vaccination status, and managing the available vaccine doses.

### Key Features

- **Vaccination Drive Management**:

  - Admin users can create vaccination drives, specifying the vaccine type, available doses, and drive dates.
  - Vaccination drive records include the vaccine name, the number of available doses, and the list of students vaccinated.

- **Student Management**:

  - Admin users can add students, either manually or via bulk import (CSV file).
  - Student details include personal information (name, age, grade, gender) and their vaccination status.
  - Students can be marked as vaccinated once they have received the vaccine, and this data is tracked in their profile.

- **Vaccination Tracking**:

  - Each vaccination entry in a student's profile includes the vaccine name, vaccination date, and drive ID.
  - Admins can track the vaccination status of all students.

- **User Interface**:

  - Simple and intuitive user interface for managing vaccination drives and student records.
  - Dashboard for administrators showing an overview of active vaccination drives, available doses, and vaccinated students.

- **API Integration**:
  - REST API to handle requests for adding, updating, and retrieving data related to students, vaccination drives, and vaccines.

### Database Design

The database is designed to store:

- **Students**: Student details including their name, age, grade, gender, and vaccination status.
- **Vaccination Drives**: Details about each vaccination drive, including drive date, vaccine name, and available doses.

### Flow of Operations

1. **Student registration**:

   - Admin adds a new student to the system, either manually or by importing a CSV file.
   - Student information is stored in the database.

2. **Admin creates a vaccination drive**:

   - Admin defines the vaccine type, available doses, and date.
   - The system stores the vaccination drive in the database.

3. **Marking students as vaccinated**:
   - Once a vaccination drive is scheduled, eligible students can be marked as vaccinated.
   - The system updates the student’s vaccination record and decrements the available doses.

### Assumptions Made

- Students are eligible for vaccination based on their grade.
- Each vaccination drive has a specific number of doses available.
- If no doses are available in a vaccination drive, students cannot be vaccinated.
- Admin users are the only ones allowed to add or update data for vaccination drives and student records.
