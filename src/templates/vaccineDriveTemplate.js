export const vaccineDriveTemplate = {
  id: "",
  name: "",
  description: "",
  vaccineName: "",
  driveDate: "", // ISO Date format (string)
  location: "",
  eligibleGrades: [], // Array of grades, e.g., [6, 7, 8]
  vaccinatedStudentIds: [], // Array of student IDs who are vaccinated
  availableDoses: 0,
  createdAt: "", // ISO Date format
  lastUpdated: "", // ISO Date format
};

const VACCINATION_DRIVE_REQUIRED_FIELDS = [
  "name",
  "vaccineName",
  "driveDate",
  "location",
  "eligibleGrades",
  "availableDoses",
];

export default VACCINATION_DRIVE_REQUIRED_FIELDS;
