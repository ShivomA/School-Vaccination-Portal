const Student = require("../models/Student");
const VaccinationDrive = require("../models/VaccinationDrive");

exports.getStudentsReport = async (req, res) => {
  try {
    const { name, age, grade, gender, vaccineTaken } = req.query;

    // Build dynamic query
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive
    }

    if (age) {
      query.age = parseInt(age);
    }

    if (grade) {
      query.grade = grade;
    }

    if (gender) {
      query.gender = gender;
    }

    if (vaccineTaken) {
      query["vaccineTaken.vaccineName"] = {
        $regex: vaccineTaken,
        $options: "i",
      };
    }

    const students = await Student.find(query).sort({ lastUpdated: -1 }).lean();

    const result = students.map((student) => ({
      id: student._id,
      name: student.name,
      age: student.age,
      grade: student.grade,
      gender: student.gender,
      vaccineTaken: student.vaccineTaken,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students report" });
  }
};

exports.getVaccinationDrivesReport = async (req, res) => {
  try {
    const {
      driveName,
      vaccineName,
      driveDate,
      applicableGrade,
      showPastDrives,
    } = req.query;

    const query = {};

    if (driveName) {
      query.driveName = { $regex: driveName, $options: "i" };
    }

    if (vaccineName) {
      query.vaccineName = { $regex: vaccineName, $options: "i" };
    }

    if (driveDate) {
      query.driveDate = driveDate;
    }

    if (applicableGrade) {
      query.applicableGrades = applicableGrade;
    }

    if (showPastDrives === "false") {
      query.driveDate = { $gte: new Date() };
    }

    // Populate vaccinated students
    const drives = await VaccinationDrive.find(query)
      .populate("vaccinatedStudentIds")
      .sort({ driveDate: 1 })
      .lean();

    const result = drives.map((drive) => ({
      id: drive._id,
      driveName: drive.driveName,
      vaccineName: drive.vaccineName,
      driveDate: drive.driveDate,
      location: drive.location,
      applicableGrades: drive.applicableGrades,
      availableDoses: drive.availableDoses,
      vaccinatedStudents: (drive.vaccinatedStudentIds || []).map((student) => ({
        id: student._id,
        name: student.name,
        age: student.age,
        grade: student.grade,
        gender: student.gender,
      })),
    }));

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch vaccination drives report" });
  }
};
