import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import VaccinationDriveForm from "../../components/VaccinationDriveForm";

import { updateVaccinationDriveToDB } from "../../api/vaccinationDrives";

const EditVaccinationDrive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const vaccinationDrive = useAppStore((state) =>
    state.vaccinationDrives.find((s) => s.id === id)
  );
  const updateVaccinationDriveInStore = useAppStore(
    (state) => state.updateVaccinationDriveInStore
  );

  const handleUpdateVaccinationDrive = async (updatedVaccinationDriveData) => {
    setLoading(true);

    try {
      const updatedVaccinationDrive = await updateVaccinationDriveToDB(
        id,
        updatedVaccinationDriveData
      );
      updateVaccinationDriveInStore(id, updatedVaccinationDrive);
      navigate("/vaccination-drives");
    } catch (error) {
      alert("Error updating vaccination drive: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!vaccinationDrive) {
    return (
      <div className="p-4 text-center text-red-600 font-medium">
        Vaccination Drive not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl my-2 mx-auto bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-semibold mb-4">
        Edit Vaccination Drive: {id}
      </div>
      {loading && (
        <div className="text-gray-500">Updating vaccination drive...</div>
      )}
      <VaccinationDriveForm
        vaccinationDrive={vaccinationDrive}
        onSubmit={handleUpdateVaccinationDrive}
      />
    </div>
  );
};

export default EditVaccinationDrive;
