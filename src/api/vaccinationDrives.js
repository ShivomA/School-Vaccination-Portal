import VACCINATION_DRIVE_REQUIRED_FIELDS from "../templates/vaccineDriveTemplate";

function generateRandomId(maxLength = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + maxLength);
}

export const fetchVaccinationDrivesFromDB = async () => {
  const dummyVaccinationDrives = [
    {
      id: "1",
      name: "Drive one",
      vaccineName: "Vaccine one",
      driveDate: "2025-06-12",
      location: "Ground",
      eligibleGrades: [1, 2, 3],
      availableDoses: 100,
    },
    {
      id: "2",
      name: "Drive two",
      vaccineName: "Vaccine two",
      driveDate: "2025-06-24",
      location: "Common area",
      eligibleGrades: [5, 6],
      availableDoses: 80,
    },
  ];

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return dummyVaccinationDrives;

  try {
    const response = fetch("api/vaccination-drives", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get vaccination drives data");
    }

    const vaccinationDrives = await response.json();
    return vaccinationDrives;
  } catch (error) {
    console.error("Error getting vaccination drives data:", error);
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

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return { ...vaccinationDrive, id: generateRandomId(), lastUpdated: "today" };

  try {
    const response = await fetch("/api/vaccination-drive", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccinationDrive),
    });

    if (!response.ok) {
      throw new Error("Failed to add vaccination drive");
    }

    const newVaccinationDrive = await response.json();
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

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return { ...vaccinationDrive, id: id, lastUpdated: "today" };

  try {
    const response = await fetch(`/api/vaccination-drive/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccinationDrive),
    });

    if (!response.ok) {
      throw new Error("Failed to update vaccination drive");
    }

    const updatedVaccinationDrive = await response.json();
    return updatedVaccinationDrive;
  } catch (error) {
    console.error("Error updating vaccination drive:", error);
    throw error;
  }
};
