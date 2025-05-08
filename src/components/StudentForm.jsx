import { useState, useEffect } from "react";

const StudentForm = ({ student, onSubmit }) => {
  // Initialize the state with the student template and empty values
  const [formData, setFormData] = useState({
    id: student?.id || "",
    name: student?.name || "",
    age: student?.age || "",
    grade: student?.grade || "",
    gender: student?.gender || "",
    guardianName: student?.guardianName || "",
    contactNumber: student?.contactNumber || "",
    address: student?.address || "",
    vaccineTaken: student?.vaccineTaken?.join(", ") || "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        name: student.name,
        age: student.age,
        grade: student.grade,
        gender: student.gender,
        guardianName: student.guardianName || "",
        contactNumber: student.contactNumber || "",
        address: student.address || "",
        vaccineTaken: student.vaccineTaken?.join(", ") || "",
      });
    }
  }, [student]);

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

    const formattedVaccines = formData.vaccineTaken
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const finalData = {
      ...formData,
      vaccineTaken: formattedVaccines,
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
        <label>*Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Grade: </label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>*Gender: </label>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Guardian Name: </label>
        <input
          type="text"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contact Number: </label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address: </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Vaccine Taken: </label>
        <input
          type="text"
          name="vaccineTaken"
          value={formData.vaccineTaken}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{student ? "Update" : "Add"} Student</button>
    </form>
  );
};

export default StudentForm;
