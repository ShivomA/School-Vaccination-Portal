export const vaccinationDriveTemplate = {
  id: "",
  driveName: "",
  vaccineName: "",
  driveDate: "",
  location: "",
  applicableGrades: [], // Array of grades
  vaccinatedStudentIds: [], // Array of student IDs who are vaccinated
  availableDoses: 0,
  lastUpdated: "",
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
