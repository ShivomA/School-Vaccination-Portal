export const studentTemplate = {
  id: "",
  name: "",
  age: 0,
  grade: "",
  gender: "",
  vaccineTaken: [], // Array of vaccine {vaccineName, dateOfVaccination}
  lastUpdated: "",
};

const STUDENT_REQUIRED_FIELDS = ["name", "age", "grade", "gender"];

export default STUDENT_REQUIRED_FIELDS;
