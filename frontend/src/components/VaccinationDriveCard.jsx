import { useNavigate } from "react-router-dom";

const VaccinationDriveCard = ({ vaccinationDrive, showEditOption = false }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`./edit/${vaccinationDrive.id}`); // Navigate to /edit/:id route
  };

  const handleDriveClick = () => {
    navigate(`./${vaccinationDrive.id}`); // Navigate to /vaccination-drives/:id route
  };

  const getFormattedDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);

    return formattedDate;
  };

  return (
    <div>
      <div onClick={handleDriveClick}>
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
          <span>{getFormattedDate(vaccinationDrive.driveDate)}</span>
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
      </div>
      {showEditOption && <button onClick={handleEditClick}>Edit</button>}
    </div>
  );
};

export default VaccinationDriveCard;
