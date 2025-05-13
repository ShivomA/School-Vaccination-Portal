import { useNavigate } from "react-router-dom";

const VaccinationDriveCard = ({ vaccinationDrive, showEditOption = false }) => {
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    navigate(`./edit/${vaccinationDrive.id}`);
  };

  const handleDriveClick = () => {
    navigate(`/vaccination-drives/${vaccinationDrive.id}`);
  };

  const getFormattedDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  return (
    <div
      onClick={handleDriveClick}
      className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="grid gap-2 text-sm md:text-base">
        <div>
          <span className="text-gray-500 font-medium">Drive name: </span>
          <span className="text-blue-800 font-semibold">
            {vaccinationDrive.driveName}
          </span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Vaccine: </span>
          <span>{vaccinationDrive.vaccineName}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Date: </span>
          <span>{getFormattedDate(vaccinationDrive.driveDate)}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Location: </span>
          <span>{vaccinationDrive.location}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Applicable grades: </span>
          <span>{vaccinationDrive.applicableGrades?.join(", ")}</span>
        </div>
        <div>
          <span className="text-gray-500 font-medium">Available doses: </span>
          <span>{vaccinationDrive.availableDoses}</span>
        </div>
      </div>

      {showEditOption && (
        <div className="mt-4 text-right">
          <button
            onClick={handleEditClick}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default VaccinationDriveCard;
