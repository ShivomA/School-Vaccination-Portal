import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import VaccinationDriveForm from "../../components/VaccinationDriveForm";

import { addVaccinationDriveToDB } from "../../api/vaccinationDrives";

const AddVaccinationDrive = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addVaccinationDriveToStore = useAppStore(
    (state) => state.addVaccinationDriveToStore
  );

  const handleAddVaccinationDrive = async (vaccinationDriveData) => {
    setLoading(true);

    try {
      const newVaccinationDrive = await addVaccinationDriveToDB(
        vaccinationDriveData
      );
      addVaccinationDriveToStore(newVaccinationDrive);
      navigate("/vaccination-drives");
    } catch (error) {
      alert("Error adding vaccination drive: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>Add New Vaccination Drive</div>
      {loading && <div>Adding vaccination drive...</div>}
      <VaccinationDriveForm onSubmit={handleAddVaccinationDrive} />
    </div>
  );
};

export default AddVaccinationDrive;
