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
      if (Object.keys(dashboardData).length !== 0 || !loading) {
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
  }, []);

  const upcomingDrives = () => {
    if (!dashboardData?.upcomingVaccinationDrives) return null;

    if (dashboardData.upcomingVaccinationDrives.length === 0) {
      return (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-2 rounded">
          No vaccination drive scheduled for next 30 days
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Upcoming Drives
        </h3>
        <div className="space-y-4">
          {dashboardData.upcomingVaccinationDrives.map((drive) => (
            <VaccinationDriveCard key={drive.id} vaccinationDrive={drive} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Dashboard</h1>

      {loading ? (
        <div className="text-blue-600 font-medium animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            {dashboardData?.totalStudents !== undefined && (
              <div className="flex-1 bg-white shadow rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  Total Registered Students
                </p>
                <p className="text-blue-800 text-xl font-semibold">
                  {dashboardData.totalStudents}
                </p>
              </div>
            )}

            {dashboardData?.percentageStudentsVaccinated !== undefined && (
              <div className="flex-1 bg-white shadow rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  Percentage Students Vaccinated
                </p>
                <p className="text-green-700 text-xl font-semibold">
                  {dashboardData.percentageStudentsVaccinated}%
                </p>
              </div>
            )}
          </div>

          {upcomingDrives()}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
