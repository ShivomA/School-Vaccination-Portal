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
      if (allVaccinationDrives.length !== 0) {
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

  const handleAddClick = () => {
    navigate("./add"); // Navigate to /add route
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

  const filterPanel = () => {
    return (
      <div>
        <input
          type="text"
          name="vaccineName"
          value={filters.vaccineName}
          placeholder="Vaccine name"
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="driveDate"
          value={filters.driveDate}
          placeholder="Drive date"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="applicableGrade"
          value={filters.applicableGrade}
          placeholder="Applicable grade"
          onChange={handleFilterChange}
        />
        <label>
          <input
            type="checkbox"
            name="showPastDrives"
            checked={filters.showPastDrives}
            placeholder="Show Past Drives"
            onChange={(e) => {
              const checked = e.target.checked;

              setFilters((prevState) => ({
                ...prevState,
                showPastDrives: checked,
              }));
            }}
          />
          Show past drives
        </label>
      </div>
    );
  };

  return (
    <div>
      <div>Vaccination Drives</div>

      <div>
        <button onClick={handleGenerateReport}>
          Generate & Download Report
        </button>

        <select
          onChange={(e) => setReportType(e.target.value)}
          value={reportType}
        >
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
      </div>

      <div>
        <div>
          <label>Search by vaccination drive name: </label>
          <input
            type="text"
            name="driveName"
            value={filters.driveName}
            placeholder="Vaccination drive name"
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <button onClick={() => setShowFilters((prev) => !prev)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {showFilters && filterPanel()}
        </div>
        <button onClick={handleAddClick}>Add vaccination drive</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredVaccinationDrives.length ? (
        filteredVaccinationDrives.map((vaccinationDrive, i) => (
          <VaccinationDriveCard
            key={i}
            vaccinationDrive={vaccinationDrive}
            showEditOption={true}
          />
        ))
      ) : (
        <div>No vaccination drive found</div>
      )}
    </div>
  );
};

export default VaccinationDrives;
