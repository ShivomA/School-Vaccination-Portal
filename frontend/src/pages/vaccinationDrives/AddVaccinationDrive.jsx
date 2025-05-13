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
    <div className="p-6 max-w-3xl my-2 mx-auto bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-semibold mb-4">
        Add New Vaccination Drive
      </div>
      {loading && (
        <div className="text-gray-500">Adding vaccination drive...</div>
      )}
      <VaccinationDriveForm onSubmit={handleAddVaccinationDrive} />
    </div>
  );
};

export default AddVaccinationDrive;
