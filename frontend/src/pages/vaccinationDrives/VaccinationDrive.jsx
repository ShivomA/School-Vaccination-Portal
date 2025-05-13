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
        console.log("Error getting vaccination drive: " + error.message);
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

  if (!vaccinationDrive) {
    return (
      <div className="p-4 text-center text-red-600 font-medium">
        Vaccination Drive not found
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-blue-50 px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="text-lg font-semibold text-gray-800">
        Vaccination Drive ID: {id}
      </div>

      {/* Vaccination Drive Card */}
      <VaccinationDriveCard
        key={vaccinationDrive.id}
        vaccinationDrive={vaccinationDrive}
      />

      {/* Student Section */}
      <div>
        <h2 className="text-md font-medium text-gray-700 mb-2">
          Applicable Students
        </h2>

        {studentsLoading ? (
          <div className="text-yellow-600">Getting student details...</div>
        ) : applicableStudents.length ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {applicableStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                drive={vaccinationDrive}
                showVaccinationOption={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No applicable student found</div>
        )}
      </div>
    </div>
  );
};

export default VaccinationDrive;
