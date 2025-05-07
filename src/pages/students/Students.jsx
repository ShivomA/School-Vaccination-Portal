import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import StudentCard from "../../components/StudentCard";

import { fetchStudentsFromDB } from "../../api/students";

const Students = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const students = useAppStore((state) => state.students);
  const setStudents = useAppStore((state) => state.setStudents);

  useEffect(() => {
    (async () => {
      if (students.length !== 0) {
        setLoading(false);
        return;
      }

      try {
        const studentsList = await fetchStudentsFromDB();
        setStudents(studentsList);
      } catch (error) {
        alert("Error getting students data: " + error.message);
      } finally {
        setLoading(false);
      }
    })();
  });

  const handleAddClick = () => {
    navigate("./add"); // Navigate to /add route
  };

  return (
    <div>
      <div>Students</div>
      <div>
        <div>
          <div>Search by name: </div>
          <input type="text" />
        </div>
        <div>
          <button>Filters</button>
        </div>
        <button onClick={handleAddClick}>Add student</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : students.length ? (
        students.map((student, i) => <StudentCard key={i} student={student} />)
      ) : (
        <div>No student found</div>
      )}
    </div>
  );
};

export default Students;
