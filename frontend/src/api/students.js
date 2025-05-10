import STUDENT_REQUIRED_FIELDS from "../templates/studentTemplate";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchStudentsFromDB = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/students`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    let students = await response.json();

    // Convert _id to id
    students = students.map((student) => ({
      ...student,
      id: student._id,
    }));

    return students;
  } catch (error) {
    console.error("Error getting students data:", error);
    throw error;
  }
};

export const addStudentToDB = async (student) => {
  // Check if the student has all the required fields
  const missingFields = STUDENT_REQUIRED_FIELDS.filter(
    (key) => !student.hasOwnProperty(key) || student[key] === ""
  );

  if (missingFields.length > 0) {
    // Throw error with missing fields
    throw new Error(`Missing fields: ${missingFields.join(", ")}`);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/students`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const newStudent = await response.json();
    newStudent.id = newStudent._id; // Convert _id to id

    return newStudent;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

export const bulkAddStudentsToDB = async (students) => {
  // Check if the student has all the required fields

  students.forEach((student) => {
    const missingFields = STUDENT_REQUIRED_FIELDS.filter(
      (key) => !student.hasOwnProperty(key) || student[key] === ""
    );

    if (missingFields.length > 0) {
      // Throw error with missing fields
      throw new Error(`Missing fields: ${missingFields.join(", ")}`);
    }
  });

  try {
    const response = await fetch(`${BASE_URL}/api/students/bulk`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ students }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const newStudents = await response.json();
    newStudents.forEach((newStudent) => {
      newStudent.id = newStudent._id; // Convert _id to id
    });

    return newStudents;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

export const updateStudentToDB = async (id, student) => {
  if (!id) {
    // Throw error of id not provided
    throw new Error("Id not provided");
  }

  // Check if the student has all the required fields
  const missingFields = STUDENT_REQUIRED_FIELDS.filter(
    (key) => !student.hasOwnProperty(key) || student[key] === ""
  );

  if (missingFields.length > 0) {
    // Throw error with missing fields
    throw new Error(`Missing fields: ${missingFields.join(", ")}`);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/students/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const updatedStudent = await response.json();
    updatedStudent.id = updatedStudent._id; // Convert _id to id

    return updatedStudent;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const fetchStudentsReport = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${BASE_URL}/api/reports/students?${queryParams}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const studentsReport = await response.json();
    return studentsReport;
  } catch (error) {
    console.error("Error fetching vaccination drive report:", error);
    throw error;
  }
};
