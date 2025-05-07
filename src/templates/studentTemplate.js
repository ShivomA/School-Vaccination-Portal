export const studentTemplate = {
  id: "",
  name: "",
  age: 0,
  grade: 0,
  gender: "",
  guardianName: "",
  contactNumber: "",
  address: "",
  vaccineTaken: [], // Array of vaccine names or IDs
  lastUpdated: "", // ISO Date format
};

const STUDENT_REQUIRED_FIELDS = ["name", "age", "grade", "gender"];

export default STUDENT_REQUIRED_FIELDS;
