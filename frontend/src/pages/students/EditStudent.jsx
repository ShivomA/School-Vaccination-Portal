import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import StudentForm from "../../components/StudentForm";

import { updateStudentToDB } from "../../api/students";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const student = useAppStore((state) =>
    state.students.find((s) => s.id === id)
  );
  const updateStudentInStore = useAppStore(
    (state) => state.updateStudentInStore
  );

  const handleUpdateStudent = async (updatedStudentData) => {
    setLoading(true);

    try {
      const updatedStudent = await updateStudentToDB(id, updatedStudentData);
      updateStudentInStore(id, updatedStudent);
      navigate("/students");
    } catch (error) {
      alert("Error updating student: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <div className="p-4 text-center text-red-600 font-medium">
        Student not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl my-2 mx-auto bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-semibold mb-4">Edit Student: {id}</div>
      {loading && <div className="text-gray-500">Updating student...</div>}
      <StudentForm student={student} onSubmit={handleUpdateStudent} />
    </div>
  );
};

export default EditStudent;
