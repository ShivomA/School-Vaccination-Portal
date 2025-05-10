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
    <div>
      <div>
        <span>Name: </span>
        <span>{student.name}</span>
      </div>
      <div>
        <span>Age: </span>
        <span>{student.age}</span>
      </div>
      <div>
        <span>Grade: </span>
        <span>{student.grade}</span>
      </div>
      <div>
        <span>Gender: </span>
        <span>{student.gender}</span>
      </div>
      {student.vaccineTaken && (
        <div>
          <span>Vaccination taken: </span>
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

      {showEditOption && <button onClick={handleEditClick}>Edit</button>}

      {showVaccinationOption &&
        (vaccinating ? (
          <div>Vaccinating</div>
        ) : student.vaccineTaken.some(
            (v) => v.vaccinationDriveId === drive.id
          ) ? (
          <div>Already vaccinated</div>
        ) : (
          <button onClick={handleMarkStudentAsVaccinated}>
            Mark as Vaccinated
          </button>
        ))}
    </div>
  );
};

export default StudentCard;
