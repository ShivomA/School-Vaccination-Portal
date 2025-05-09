import STUDENT_REQUIRED_FIELDS from "../templates/studentTemplate";

function generateRandomId(maxLength = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + maxLength);
}

export const fetchStudentsFromDB = async () => {
  const dummyStudents = [
    {
      id: "1",
      name: "One",
      age: 1,
      grade: "1",
      gender: "Male",
      vaccineTaken: [
        { name: "a", dateOfVaccination: "2025-06-12" },
        { name: "b", dateOfVaccination: "2025-06-18" },
      ],
    },
    {
      id: "2",
      name: "Two",
      age: 2,
      grade: "2",
      gender: "Female",
      vaccineTaken: [
        { name: "b", dateOfVaccination: "2025-07-12" },
        { name: "c", dateOfVaccination: "2025-07-18" },
      ],
    },
  ];

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return dummyStudents;

  try {
    const response = fetch("api/students", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get students data");
    }

    const students = await response.json();
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

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return { ...student, id: generateRandomId(), lastUpdated: "today" };

  try {
    const response = await fetch("/api/students", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error("Failed to add student");
    }

    const newStudent = await response.json();
    return newStudent;
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

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return { ...student, id: id, lastUpdated: "today" };

  try {
    const response = await fetch(`/api/students/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    const updatedStudent = await response.json();
    return updatedStudent;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const fetchStudentsReport = async (filters = {}) => {
  const dummyStudentsReport = [
    {
      id: "1",
      name: "One",
      age: 1,
      grade: "1",
      gender: "Male",
      vaccineTaken: [
        { name: "a", dateOfVaccination: "2025-06-12" },
        { name: "b", dateOfVaccination: "2025-06-18" },
      ],
    },
    {
      id: "2",
      name: "Two",
      age: 2,
      grade: "2",
      gender: "Female",
      vaccineTaken: [
        { name: "b", dateOfVaccination: "2025-07-12" },
        { name: "c", dateOfVaccination: "2025-07-18" },
      ],
    },
  ];

  const filteredDummyStudentsReport = dummyStudentsReport.filter((student) => {
    const containName = filters.name
      ? student.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;

    const matchAge = filters.age ? student.age === filters.age : true;
    const matchGrade = filters.grade ? student.grade === filters.grade : true;
    const matchGender = filters.gender
      ? student.gender === filters.gender
      : true;
    const matchVaccine = filters.vaccineTaken
      ? student.vaccineTaken.map((v) => v.name).includes(filters.vaccineTaken)
      : true;

    return containName && matchAge && matchGrade && matchGender && matchVaccine;
  });

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return filteredDummyStudentsReport;

  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/reports/students?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch students report");
    }

    const studentsReport = await response.json();
    return studentsReport;
  } catch (error) {
    console.error("Error fetching vaccination drive report:", error);
    throw error;
  }
};
