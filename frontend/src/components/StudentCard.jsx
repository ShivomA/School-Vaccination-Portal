import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`./edit/${student.id}`); // Navigate to /edit/:id route
  };

  const getFormattedDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);

    return formattedDate;
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
                        v.dateOfVaccination
                      )})`
                  )
                  .join(", ")}
          </span>
        </div>
      )}
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default StudentCard;
