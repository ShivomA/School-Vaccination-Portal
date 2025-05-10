import VACCINATION_DRIVE_REQUIRED_FIELDS from "../templates/vaccinationDriveTemplate";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchVaccinationDrivesFromDB = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/vaccination-drives`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    let vaccinationDrives = await response.json();

    // Convert _id to id
    vaccinationDrives = vaccinationDrives.map((drive) => ({
      ...drive,
      id: drive._id,
    }));

    return vaccinationDrives;
  } catch (error) {
    console.error("Error getting vaccination drives data:", error);
    throw error;
  }
};

export const fetchVaccinationDriveById = async (id) => {
  if (!id) {
    // Throw error of id not provided
    throw new Error("Id not provided");
  }

  try {
    const response = await fetch(`${BASE_URL}/api/vaccination-drives/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const vaccinationDrive = await response.json();
    vaccinationDrive.id = vaccinationDrive._id; // Convert _id to id

    return vaccinationDrive;
  } catch (error) {
    console.error("Error getting vaccination drive data:", error);
    throw error;
  }
};

export const addVaccinationDriveToDB = async (vaccinationDrive) => {
  // Check if the vaccination drive has all the required fields
  const missingFields = VACCINATION_DRIVE_REQUIRED_FIELDS.filter(
    (key) =>
      !vaccinationDrive.hasOwnProperty(key) || vaccinationDrive[key] === ""
  );

  if (missingFields.length > 0) {
    // Throw error with missing fields
    throw new Error(`Missing fields: ${missingFields.join(", ")}`);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/vaccination-drives`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccinationDrive),
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const newVaccinationDrive = await response.json();
    newVaccinationDrive.id = newVaccinationDrive._id; // Convert _id to id

    return newVaccinationDrive;
  } catch (error) {
    console.error("Error adding vaccination derive:", error);
    throw error;
  }
};

export const updateVaccinationDriveToDB = async (id, vaccinationDrive) => {
  if (!id) {
    // Throw error of id not provided
    throw new Error("Id not provided");
  }

  // Check if the vaccination drive has all the required fields
  const missingFields = VACCINATION_DRIVE_REQUIRED_FIELDS.filter(
    (key) =>
      !vaccinationDrive.hasOwnProperty(key) || vaccinationDrive[key] === ""
  );

  if (missingFields.length > 0) {
    // Throw error with missing fields
    throw new Error(`Missing fields: ${missingFields.join(", ")}`);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/vaccination-drives/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccinationDrive),
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const updatedVaccinationDrive = await response.json();
    updatedVaccinationDrive.id = updatedVaccinationDrive._id; // Convert _id to id

    return updatedVaccinationDrive;
  } catch (error) {
    console.error("Error updating vaccination drive:", error);
    throw error;
  }
};

export const fetchVaccinationDrivesReport = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${BASE_URL}/api/reports/vaccination-drives?${queryParams}`,
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

    const vaccinationDrivesReport = await response.json();
    return vaccinationDrivesReport;
  } catch (error) {
    console.error("Error fetching vaccination drives report:", error);
    throw error;
  }
};

export const fetchStudentsForVaccinationDrives = async (id) => {
  if (!id) {
    // Throw error of id not provided
    throw new Error("Id not provided");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/vaccination-drives/${id}/students`,
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

    let applicableStudents = await response.json();

    // Convert _id to id
    applicableStudents = applicableStudents.map((student) => ({
      ...student,
      id: student._id,
    }));

    return applicableStudents;
  } catch (error) {
    console.error("Error getting applicable students data:", error);
    throw error;
  }
};
