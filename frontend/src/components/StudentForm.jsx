import { useState, useEffect } from "react";

const StudentForm = ({ student, onSubmit }) => {
  // Initialize the state with the student template and empty values
  const [formData, setFormData] = useState({
    id: student?.id || "",
    name: student?.name || "",
    age: student?.age || "",
    grade: student?.grade || "",
    gender: student?.gender || "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        name: student.name,
        age: student.age,
        grade: student.grade,
        gender: student.gender,
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

    // Pass the final data to the onSubmit handler (Add or Update)
    onSubmit(formData);
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
      <button type="submit">{student ? "Update" : "Add"} Student</button>
    </form>
  );
};

export default StudentForm;
