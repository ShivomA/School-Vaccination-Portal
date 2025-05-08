export const studentTemplate = {
  id: "",
  name: "",
  age: 0,
  grade: "",
  gender: "",
  guardianName: "",
  contactNumber: "",
  address: "",
  vaccineTaken: [], // Array of vaccine {name, dateOfVaccination}
  lastUpdated: "", // ISO Date format
};

const STUDENT_REQUIRED_FIELDS = ["name", "age", "grade", "gender"];

export default STUDENT_REQUIRED_FIELDS;
