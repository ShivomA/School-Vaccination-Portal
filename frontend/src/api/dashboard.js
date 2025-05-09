export const getDashboardData = async () => {
  const dummyDashboardData = {
    totalStudents: 1000,
    percentageStudentsVaccinated: 88.8,
    upcomingVaccinationDrives: [
      {
        id: "1",
        driveName: "Drive one",
        vaccineName: "Vaccine one",
        driveDate: "2025-06-12",
        location: "Ground",
        applicableGrades: ["1", "2", "3"],
        availableDoses: 100,
      },
      {
        id: "2",
        driveName: "Drive two",
        vaccineName: "Vaccine two",
        driveDate: "2025-06-24",
        location: "Common area",
        applicableGrades: ["3", "4", "5"],
        availableDoses: 80,
      },
    ],
  };

  await new Promise((res) => setTimeout(res, 1000));

  // Return dummy response
  return dummyDashboardData;

  try {
    const response = fetch("api/dashboard", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get dashboard data");
    }

    const dashboardData = await response.json();
    return dashboardData;
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    throw error;
  }
};
