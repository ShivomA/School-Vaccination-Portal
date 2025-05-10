import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import StudentCard from "../../components/StudentCard";
import VaccinationDriveCard from "../../components/VaccinationDriveCard";

import {
  fetchVaccinationDriveById,
  fetchStudentsForVaccinationDrives,
} from "../../api/vaccinationDrives";

const VaccinationDrive = () => {
  const { id } = useParams();
  const [driveLoading, setDriveLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const vaccinationDrive = useAppStore(
    (state) => state.selectedVaccinationDrive
  );
  const applicableStudents = useAppStore((state) => state.applicableStudents);

  const setApplicableStudents = useAppStore(
    (state) => state.setApplicableStudents
  );
  const setSelectedVaccinationDrive = useAppStore(
    (state) => state.setSelectedVaccinationDrive
  );

  useEffect(() => {
    // Fetch vaccination drive
    (async () => {
      if (vaccinationDrive?.id === id || !driveLoading) {
        setDriveLoading(false);
        return;
      }

      try {
        const fetchedVaccinationDrive = await fetchVaccinationDriveById(id);
        setSelectedVaccinationDrive(fetchedVaccinationDrive);
      } catch (error) {
        alert("Error getting vaccination drive: " + error.message);
      } finally {
        setDriveLoading(false);
      }
    })();
  });

  useEffect(() => {
    // Fetch applicable students list
    (async () => {
      if (applicableStudents.length !== 0 || !studentsLoading) {
        setStudentsLoading(false);
        return;
      }

      try {
        const applicableStudentsList = await fetchStudentsForVaccinationDrives(
          id
        );
        setApplicableStudents(applicableStudentsList);
      } catch (error) {
        alert("Error getting applicable students data: " + error.message);
      } finally {
        setStudentsLoading(false);
      }
    })();
  });

  if (!vaccinationDrive) return <div>Vaccination Drive not found</div>;

  return (
    <div>
      <div>Vaccination Drive: {id}</div>
      <VaccinationDriveCard
        key={vaccinationDrive.id}
        vaccinationDrive={vaccinationDrive}
      />

      {studentsLoading ? (
        <div>Getting students details...</div>
      ) : applicableStudents.length ? (
        applicableStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            drive={vaccinationDrive}
            showVaccinationOption={true}
          />
        ))
      ) : (
        <div>No applicable student found</div>
      )}
    </div>
  );
};

export default VaccinationDrive;
