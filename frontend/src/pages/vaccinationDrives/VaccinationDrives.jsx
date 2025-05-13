import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import VaccinationDriveCard from "../../components/VaccinationDriveCard";

import {
  fetchVaccinationDrivesFromDB,
  fetchVaccinationDrivesReport,
} from "../../api/vaccinationDrives";
import {
  downloadVaccinationDrivesReportCSV,
  downloadVaccinationDrivesReportExcel,
} from "../../utils/exportUtils";

const VaccinationDrives = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("excel");

  const allVaccinationDrives = useAppStore((state) => state.vaccinationDrives);
  const setVaccinationDrives = useAppStore(
    (state) => state.setVaccinationDrives
  );

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    driveName: "",
    vaccineName: "",
    driveDate: "",
    applicableGrade: "",
    showPastDrives: false,
  });

  const filteredVaccinationDrives = useMemo(() => {
    return allVaccinationDrives.filter((vaccinationDrive) => {
      const containDriveName = filters.driveName
        ? vaccinationDrive.driveName
            .toLowerCase()
            .includes(filters.driveName.toLowerCase())
        : true;

      const containVaccineName = filters.vaccineName
        ? vaccinationDrive.vaccineName
            .toLowerCase()
            .includes(filters.vaccineName.toLowerCase())
        : true;

      const matchdriveDate = filters.driveDate
        ? vaccinationDrive.driveDate.split("T")[0] === filters.driveDate
        : true;

      const matchApplicableGrade = filters.applicableGrade
        ? vaccinationDrive.applicableGrades.includes(filters.applicableGrade)
        : true;

      const matchPastDrives = filters.showPastDrives
        ? true
        : new Date(vaccinationDrive.driveDate) >= new Date();

      return (
        containDriveName &&
        containVaccineName &&
        matchdriveDate &&
        matchApplicableGrade &&
        matchPastDrives
      );
    });
  }, [allVaccinationDrives, filters]);

  useEffect(() => {
    (async () => {
      if (allVaccinationDrives.length !== 0 || !loading) {
        setLoading(false);
        return;
      }

      try {
        const vaccinationDrivesList = await fetchVaccinationDrivesFromDB();
        setVaccinationDrives(vaccinationDrivesList);
      } catch (error) {
        alert("Error getting vaccination drives data: " + error.message);
      } finally {
        setLoading(false);
      }
    })();
  });

  const handleGenerateReport = async () => {
    const reportData = await fetchVaccinationDrivesReport(filters);

    if (reportType === "excel") {
      downloadVaccinationDrivesReportExcel(reportData);
    } else if (reportType === "csv") {
      downloadVaccinationDrivesReportCSV(reportData);
    }
  };

  const handleFilterChange = (e) => {
    let { type, name, value } = e.target;
    if (type === "number" && value !== "") {
      value = parseInt(value, 10);
    }

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    navigate("./add"); // Navigate to /add route
  };

  const vaccinationDriveActionsBar = () => {
    return (
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Search by Name */}
          <div className="flex items-center">
            <label className="mr-2 text-sm">
              Search by vaccination drive name:
            </label>
            <input
              type="text"
              name="driveName"
              value={filters.driveName}
              placeholder="Drive name"
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-36"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-blue-500 hover:underline"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Add Vaccination drive */}
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add vaccination drive
          </button>

          {/* Generate Report */}
          <div className="flex items-center">
            <button
              onClick={handleGenerateReport}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Generate Report
            </button>
            <select
              onChange={(e) => setReportType(e.target.value)}
              value={reportType}
              className="ml-2 p-2 border rounded-lg"
            >
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const filterPanel = () => {
    return (
      <div className="bg-white px-4 pb-4 mb-2 rounded shadow-md grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Vaccine Name
          </label>
          <input
            type="text"
            name="vaccineName"
            value={filters.vaccineName}
            placeholder="Vaccine name"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Drive Date
          </label>
          <input
            type="date"
            name="driveDate"
            value={filters.driveDate}
            placeholder="Drive date"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Applicable Grade
          </label>
          <input
            type="text"
            name="applicableGrade"
            value={filters.applicableGrade}
            placeholder="Applicable grade"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center space-x-2 mt-6">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="showPastDrives"
              checked={filters.showPastDrives}
              onChange={(e) =>
                setFilters((prevState) => ({
                  ...prevState,
                  showPastDrives: e.target.checked,
                }))
              }
              className="h-4 w-4 text-blue-600"
            />
            <span>Show past drives</span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Vaccination drives
      </h1>

      {/* Vaccination Drive Actions Bar */}
      {vaccinationDriveActionsBar()}

      {/* Filter Panel (visible when Show Filters is true) */}
      {showFilters && filterPanel()}

      {/* Vaccination drive Cards */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-blue-600 font-medium animate-pulse">
            Loading...
          </div>
        ) : filteredVaccinationDrives.length ? (
          filteredVaccinationDrives.map((vaccinationDrive) => (
            <VaccinationDriveCard
              key={vaccinationDrive.id}
              vaccinationDrive={vaccinationDrive}
              showEditOption={true}
            />
          ))
        ) : (
          <div className="text-gray-500">No vaccination drive found</div>
        )}
      </div>
    </div>
  );
};

export default VaccinationDrives;
