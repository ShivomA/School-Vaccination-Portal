import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import StudentForm from "../../components/StudentForm";

import { addStudentToDB } from "../../api/students";

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addStudentToStore = useAppStore((state) => state.addStudentToStore);

  const handleAddStudent = async (studentData) => {
    setLoading(true);

    try {
      const newStudent = await addStudentToDB(studentData);
      addStudentToStore(newStudent);
      navigate("/students");
    } catch (error) {
      alert("Error adding student: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl my-2 mx-auto bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-semibold mb-4">Add New Student</div>
      {loading && <div className="text-gray-500">Adding student...</div>}
      <StudentForm onSubmit={handleAddStudent} />
    </div>
  );
};

export default AddStudent;
