const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getDashboardData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/dashboard`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // parse the error message
      throw new Error(errorData.error);
    }

    const dashboardData = await response.json();
    return dashboardData;
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    throw error;
  }
};
