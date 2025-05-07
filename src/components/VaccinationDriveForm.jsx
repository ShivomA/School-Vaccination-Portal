import { useState, useEffect } from "react";

const VaccinationDriveForm = ({ vaccinationDrive, onSubmit }) => {
  // Initialize the state with the vaccination drive template and empty values
  const [formData, setFormData] = useState({
    id: vaccinationDrive?.id || "",
    name: vaccinationDrive?.name || "",
    description: vaccinationDrive?.description || "",
    vaccineName: vaccinationDrive?.vaccineName || "",
    driveDate: vaccinationDrive?.driveDate || "",
    location: vaccinationDrive?.location || "",
    eligibleGrades: vaccinationDrive?.eligibleGrades?.join(", ") || "",
    availableDoses: vaccinationDrive?.availableDoses || "",
  });

  useEffect(() => {
    if (vaccinationDrive) {
      setFormData({
        id: vaccinationDrive.id,
        name: vaccinationDrive.name,
        description: vaccinationDrive.description || "",
        vaccineName: vaccinationDrive.vaccineName,
        driveDate: vaccinationDrive.driveDate || "",
        location: vaccinationDrive.location,
        eligibleGrades: vaccinationDrive.eligibleGrades.join(", "),
        availableDoses: vaccinationDrive.availableDoses,
      });
    }
  }, [vaccinationDrive]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedEligibleGrades = formData.eligibleGrades
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const finalData = {
      ...formData,
      eligibleGrades: formattedEligibleGrades,
    };

    // Pass the final data to the onSubmit handler (Add or Update)
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>*Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
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
        <label>*Eligible grades: </label>
        <input
          type="text"
          name="eligibleGrades"
          value={formData.eligibleGrades}
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
