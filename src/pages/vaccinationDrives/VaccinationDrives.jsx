import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import VaccinationDriveCard from "../../components/VaccinationDriveCard";

import { fetchVaccinationDrivesFromDB } from "../../api/vaccinationDrives";

const VaccinationDrives = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const vaccinationDrives = useAppStore((state) => state.vaccinationDrives);
  const setVaccinationDrives = useAppStore(
    (state) => state.setVaccinationDrives
  );

  useEffect(() => {
    (async () => {
      if (vaccinationDrives.length !== 0) {
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

  const handleAddClick = () => {
    navigate("./add"); // Navigate to /add route
  };

  return (
    <div>
      <div>Vaccination Drives</div>
      <div>
        <div>
          <div>Search by vaccination drive name: </div>
          <input type="text" />
        </div>
        <div>
          <button>Filters</button>
        </div>
        <button onClick={handleAddClick}>Add vaccination drive</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : vaccinationDrives.length ? (
        vaccinationDrives.map((vaccinationDrive, i) => (
          <VaccinationDriveCard key={i} vaccinationDrive={vaccinationDrive} />
        ))
      ) : (
        <div>No vaccination drive found</div>
      )}
    </div>
  );
};

export default VaccinationDrives;
