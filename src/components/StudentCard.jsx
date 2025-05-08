import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`./edit/${student.id}`); // Navigate to /edit/:id route
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
          <span>{student.vaccineTaken.join(", ")}</span>
        </div>
      )}
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default StudentCard;
