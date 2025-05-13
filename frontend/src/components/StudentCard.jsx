import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../store/useAppStore";
import { markStudentAsVaccinated } from "../api/students";

const StudentCard = ({
  student,
  drive = null,
  showEditOption = false,
  showVaccinationOption = false,
}) => {
  const navigate = useNavigate();
  const [vaccinating, setVaccinating] = useState(false);

  const updateApplicableStudentInStore = useAppStore(
    (state) => state.updateApplicableStudentInStore
  );

  const getFormattedDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);

    return formattedDate;
  };

  const handleEditClick = () => {
    navigate(`./edit/${student.id}`); // Navigate to /edit/:id route
  };

  const handleMarkStudentAsVaccinated = async () => {
    setVaccinating(true);

    try {
      const updatedStudent = await markStudentAsVaccinated(student.id, drive);
      updateApplicableStudentInStore(student.id, updatedStudent);
    } catch (error) {
      alert("Error updating vaccination for student: " + error.message);
    } finally {
      setVaccinating(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <span className="text-gray-500 font-medium">Name: </span>
          <span>{student.name}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Age: </span>
          <span>{student.age}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Grade: </span>
          <span>{student.grade}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Gender: </span>
          <span>{student.gender}</span>
        </div>
      </div>
      {student.vaccineTaken && (
        <div className="sm:col-span-2 md:col-span-3 mt-2">
          <span className="text-gray-500 font-medium">Vaccination taken: </span>
          <span>
            {student.vaccineTaken.length === 0
              ? "None"
              : student.vaccineTaken
                  .map(
                    (v) =>
                      `${v.vaccineName} (${getFormattedDate(
                        v.vaccinationDate
                      )})`
                  )
                  .join(", ")}
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {showEditOption && (
          <button
            onClick={handleEditClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded"
          >
            Edit
          </button>
        )}

        {showVaccinationOption &&
          (vaccinating ? (
            <div className="text-sm text-yellow-600">Vaccinating...</div>
          ) : student.vaccineTaken.some(
              (v) => v.vaccinationDriveId === drive.id
            ) ? (
            <div className="text-sm text-green-600">Already vaccinated</div>
          ) : (
            <button
              onClick={handleMarkStudentAsVaccinated}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded"
            >
              Mark as Vaccinated
            </button>
          ))}
      </div>
    </div>
  );
};

export default StudentCard;
