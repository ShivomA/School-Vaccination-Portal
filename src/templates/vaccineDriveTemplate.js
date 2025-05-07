const vaccineDriveTemplate = {
  id: "",
  title: "",
  description: "",
  driveDate: "", // ISO Date format (string)
  location: "",
  eligibleGrades: [], // Array of grades, e.g., [6, 7, 8]
  vaccineName: "",
  vaccinatedStudentIds: [], // Array of student IDs who are vaccinated
  totalDoses: 0,
  availableDoses: 0,
  createdAt: "", // ISO Date format
};

export default vaccineDriveTemplate;
