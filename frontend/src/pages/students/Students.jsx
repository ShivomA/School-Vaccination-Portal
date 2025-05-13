import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import useAppStore from "../../store/useAppStore";
import StudentCard from "../../components/StudentCard";

import {
  downloadStudentsReportCSV,
  downloadStudentsReportExcel,
} from "../../utils/exportUtils";
import {
  bulkAddStudentsToDB,
  fetchStudentsFromDB,
  fetchStudentsReport,
} from "../../api/students";

const Students = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [reportType, setReportType] = useState("excel");

  const allStudents = useAppStore((state) => state.students);
  const setStudents = useAppStore((state) => state.setStudents);
  const bulkAddStudentsToStore = useAppStore(
    (state) => state.bulkAddStudentsToStore
  );

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
        ? student.vaccineTaken
            .map((v) => v.vaccineName.toLowerCase())
            .includes(filters.vaccineTaken.toLowerCase())
        : true;

      return (
        containName && matchAge && matchGrade && matchGender && matchVaccine
      );
    });
  }, [allStudents, filters]);

  useEffect(() => {
    (async () => {
      if (allStudents.length !== 0 || !loading) {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImporting(true); // Start importing

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const students = results.data.map((row) => ({
          name: row.name,
          age: parseInt(row.age),
          grade: row.grade,
          gender: row.gender,
        }));

        // Optional: validate data
        const isValid = students.every(
          (s) =>
            s.name &&
            s.grade &&
            ["Male", "Female"].includes(s.gender) &&
            Number.isInteger(s.age)
        );

        if (!isValid) {
          e.target.value = "";
          setIsImporting(false);
          alert("Invalid CSV data");
          return;
        }

        try {
          const newStudents = await bulkAddStudentsToDB(students);
          bulkAddStudentsToStore(newStudents);
        } catch (error) {
          alert("Error adding student: " + error.message);
        } finally {
          e.target.value = ""; // Reset after processing
          setIsImporting(false); // Done importing
        }
      },
    });
  };

  const handleGenerateReport = async () => {
    const reportData = await fetchStudentsReport(filters);

    if (reportType === "excel") {
      downloadStudentsReportExcel(reportData);
    } else if (reportType === "csv") {
      downloadStudentsReportCSV(reportData);
    }
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

  const handleAddClick = () => {
    navigate("./add"); // Navigate to /add route
  };

  const studentActionsBar = () => {
    return (
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Search by Name */}
          <div className="flex items-center">
            <label className="mr-2 text-sm">Search by name:</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              placeholder="Name"
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-36"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-blue-500 hover:underline"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Add Student */}
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add Student
          </button>

          {/* Bulk Upload */}
          <div>
            <label
              htmlFor="bulk-upload"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              Bulk Upload
            </label>
            <input
              type="file"
              id="bulk-upload"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Generate Report */}
          <div className="flex items-center">
            <button
              onClick={handleGenerateReport}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Generate Report
            </button>
            <select
              onChange={(e) => setReportType(e.target.value)}
              value={reportType}
              className="ml-2 p-2 border rounded-lg"
            >
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const filterPanel = () => {
    return (
      <div className="bg-white px-4 pb-4 mb-2 rounded shadow-md grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={filters.age}
            placeholder="Enter age"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Grade</label>
          <input
            type="text"
            name="grade"
            value={filters.grade}
            placeholder="Enter grade"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Vaccine Taken
          </label>
          <input
            type="text"
            name="vaccineTaken"
            value={filters.vaccineTaken}
            placeholder="Enter vaccine name"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Students</h1>

      {/* Student Actions Bar */}
      {studentActionsBar()}

      {/* Filter Panel (visible when Show Filters is true) */}
      {showFilters && filterPanel()}

      {/* Status Messages */}
      {isImporting && <p className="text-yellow-600">Importing students...</p>}

      {/* Student Cards */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="text-blue-600 font-medium animate-pulse">
            Loading...
          </div>
        ) : filteredStudents.length ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              showEditOption={true}
            />
          ))
        ) : (
          <div className="text-gray-500">No student found</div>
        )}
      </div>
    </div>
  );
};

export default Students;
