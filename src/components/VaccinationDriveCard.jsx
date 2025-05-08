import { useNavigate } from "react-router-dom";

const VaccinationDriveCard = ({ vaccinationDrive }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`./edit/${vaccinationDrive.id}`); // Navigate to /edit/:id route
  };

  return (
    <div>
      <div>
        <span>Drive name: </span>
        <span>{vaccinationDrive.driveName}</span>
      </div>
      <div>
        <span>Vaccine: </span>
        <span>{vaccinationDrive.vaccineName}</span>
      </div>
      <div>
        <span>Date: </span>
        <span>{vaccinationDrive.driveDate}</span>
      </div>
      <div>
        <span>Location: </span>
        <span>{vaccinationDrive.location}</span>
      </div>
      <div>
        <span>Applicable grades: </span>
        <span>{vaccinationDrive.applicableGrades?.join(", ")}</span>
      </div>
      <div>
        <span>Available doses: </span>
        <span>{vaccinationDrive.availableDoses}</span>
      </div>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default VaccinationDriveCard;
