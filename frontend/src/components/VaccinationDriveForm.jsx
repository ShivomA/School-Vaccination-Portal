import { useState, useEffect } from "react";

const VaccinationDriveForm = ({ vaccinationDrive, onSubmit }) => {
  // Initialize the state with the vaccination drive template and empty values
  const [formData, setFormData] = useState({
    id: vaccinationDrive?.id || "",
    driveName: vaccinationDrive?.driveName || "",
    vaccineName: vaccinationDrive?.vaccineName || "",
    driveDate: vaccinationDrive?.driveDate.split("T")[0] || "",
    location: vaccinationDrive?.location || "",
    applicableGrades: vaccinationDrive?.applicableGrades?.join(", ") || "",
    availableDoses: vaccinationDrive?.availableDoses || "",
  });

  useEffect(() => {
    if (vaccinationDrive) {
      setFormData({
        id: vaccinationDrive.id,
        driveName: vaccinationDrive.driveName,
        vaccineName: vaccinationDrive.vaccineName,
        driveDate: vaccinationDrive.driveDate.split("T")[0],
        location: vaccinationDrive.location,
        applicableGrades: vaccinationDrive.applicableGrades.join(", "),
        availableDoses: vaccinationDrive.availableDoses,
      });
    }
  }, [vaccinationDrive]);

  const handleChange = (e) => {
    let { type, name, value } = e.target;
    if (type === "number" && value !== "") {
      value = parseInt(value, 10);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedApplicableGrades = formData.applicableGrades
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const finalData = {
      ...formData,
      applicableGrades: formattedApplicableGrades,
    };

    // Pass the final data to the onSubmit handler (Add or Update)
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>*Drive name: </label>
        <input
          type="text"
          name="driveName"
          value={formData.driveName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Vaccine name: </label>
        <input
          type="text"
          name="vaccineName"
          value={formData.vaccineName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Drive date: </label>
        <input
          type="date"
          name="driveDate"
          value={formData.driveDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Location: </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Applicable grades: </label>
        <input
          type="text"
          name="applicableGrades"
          value={formData.applicableGrades}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Available doses: </label>
        <input
          type="number"
          name="availableDoses"
          value={formData.availableDoses}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {vaccinationDrive ? "Update" : "Add"} Vaccination Drive
      </button>
    </form>
  );
};

export default VaccinationDriveForm;
