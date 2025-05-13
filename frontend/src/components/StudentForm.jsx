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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          *Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">*Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          *Grade:
        </label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          *Gender:
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {student ? "Update" : "Add"} Student
      </button>
    </form>
  );
};

export default StudentForm;
