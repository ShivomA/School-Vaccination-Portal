import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppStore from "../../store/useAppStore";
import StudentCard from "../../components/StudentCard";

import { fetchStudentsFromDB } from "../../api/students";

const Students = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const allStudents = useAppStore((state) => state.students);
  const setStudents = useAppStore((state) => state.setStudents);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",
    vaccineTaken: "",
  });

  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const containName = filters.name
        ? student.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const matchAge = filters.age ? student.age === filters.age : true;
      const matchGrade = filters.grade ? student.grade === filters.grade : true;
      const matchGender = filters.gender
        ? student.gender === filters.gender
        : true;
      const matchVaccine = filters.vaccineTaken
        ? student.vaccineTaken.includes(filters.vaccineTaken)
        : true;

      return (
        containName && matchAge && matchGrade && matchGender && matchVaccine
      );
    });
  }, [allStudents, filters]);

  useEffect(() => {
    (async () => {
      if (allStudents.length !== 0) {
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

  const handleFilterChange = (e) => {
    let { type, name, value } = e.target;
    if (type === "number" && value !== "") {
      value = parseInt(value, 10);
    }

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filterPanel = () => {
    return (
      <div>
        <input
          type="number"
          name="age"
          value={filters.age}
          placeholder="Age"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="grade"
          value={filters.grade}
          placeholder="Grade"
          onChange={handleFilterChange}
        />
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="vaccineTaken"
          value={filters.vaccineTaken}
          placeholder="Vaccine Taken"
          onChange={handleFilterChange}
        />
      </div>
    );
  };

  return (
    <div>
      <div>Students</div>

      <div>
        <div>
          <label>Search by name: </label>
          <input
            type="text"
            name="name"
            value={filters.name}
            placeholder="Name"
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <button onClick={() => setShowFilters((prev) => !prev)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {showFilters && filterPanel()}
        </div>
        <button onClick={handleAddClick}>Add student</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredStudents.length ? (
        filteredStudents.map((student, i) => (
          <StudentCard key={i} student={student} />
        ))
      ) : (
        <div>No student found</div>
      )}
    </div>
  );
};

export default Students;
