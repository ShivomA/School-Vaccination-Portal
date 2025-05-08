import { useEffect, useState } from "react";

import useAppStore from "../store/useAppStore";
import VaccinationDriveCard from "../components/VaccinationDriveCard";

import { getDashboardData } from "../api/dashboard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const dashboardData = useAppStore((state) => state.dashboardData);
  const setDashboardData = useAppStore((state) => state.setDashboardData);

  useEffect(() => {
    (async () => {
      if (Object.keys(dashboardData).length !== 0) {
        setLoading(false);
        return;
      }

      try {
        const dashboardData = await getDashboardData();
        setDashboardData(dashboardData);
      } catch (error) {
        alert("Error getting dashboard data: " + error.message);
      } finally {
        setLoading(false);
      }
    })();
  });

  const upcomingDrives = () => {
    if (!dashboardData?.upcomingVaccinationDrives) return null;

    if (dashboardData.upcomingVaccinationDrives.length === 0) {
      return <div>No vaccination drive scheduled for next 30 days</div>;
    }

    return (
      <>
        <div>Upcoming drives</div>
        {dashboardData.upcomingVaccinationDrives.map((drive) => (
          <VaccinationDriveCard key={drive.id} vaccinationDrive={drive} />
        ))}
      </>
    );
  };

  return (
    <div>
      <div>Dashboard</div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {dashboardData?.totalStudents && (
            <div>Total registered students: {dashboardData?.totalStudents}</div>
          )}

          {dashboardData?.percentageStudentsVaccinated && (
            <div>
              Percentage students vaccinated:{" "}
              {dashboardData?.percentageStudentsVaccinated}%
            </div>
          )}

          {upcomingDrives()}
        </>
      )}
    </div>
  );
};

export default Dashboard;
