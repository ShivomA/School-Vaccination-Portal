export const vaccineDriveTemplate = {
  id: "",
  driveName: "",
  description: "",
  vaccineName: "",
  driveDate: "", // ISO Date format (string)
  location: "",
  applicableGrades: [], // Array of grades
  vaccinatedStudentIds: [], // Array of student IDs who are vaccinated
  availableDoses: 0,
  createdAt: "", // ISO Date format
  lastUpdated: "", // ISO Date format
};

const VACCINATION_DRIVE_REQUIRED_FIELDS = [
  "driveName",
  "vaccineName",
  "driveDate",
  "location",
  "applicableGrades",
  "availableDoses",
];

export default VACCINATION_DRIVE_REQUIRED_FIELDS;
