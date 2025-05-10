const Student = require("../models/Student");
const VaccinationDrive = require("../models/VaccinationDrive");

exports.getDashboardData = async (req, res) => {
  try {
    const [students, drives] = await Promise.all([
      Student.find().lean(),
      VaccinationDrive.find().lean(),
    ]);

    const totalStudents = students.length;

    // Build grade -> required vaccine mapping
    const gradeToRequiredVaccines = {};
    drives.forEach((drive) => {
      drive.applicableGrades.forEach((grade) => {
        if (!gradeToRequiredVaccines[grade]) {
          gradeToRequiredVaccines[grade] = new Set();
        }
        gradeToRequiredVaccines[grade].add(drive.vaccineName);
      });
    });

    // Count how many students are fully vaccinated
    let fullyVaccinated = 0;

    for (const student of students) {
      const requiredVaccines = gradeToRequiredVaccines[student.grade];

      if (!requiredVaccines || requiredVaccines.size === 0) continue;

      const takenVaccines = new Set(
        student.vaccineTaken.map((v) => v.vaccineName)
      );

      const isFullyVaccinated = [...requiredVaccines].every((vaccine) =>
        takenVaccines.has(vaccine)
      );

      if (isFullyVaccinated) fullyVaccinated++;
    }

    const percentageStudentsVaccinated =
      totalStudents > 0
        ? parseFloat(((fullyVaccinated / totalStudents) * 100).toFixed(1))
        : 0;

    // Get upcoming drives only
    const today = new Date();
    const upcomingVaccinationDrives = drives
      .filter((d) => new Date(d.driveDate) > today)
      .map((d) => ({
        id: d._id.toString(),
        driveName: d.driveName,
        vaccineName: d.vaccineName,
        driveDate: d.driveDate,
        location: d.location,
        applicableGrades: d.applicableGrades,
        availableDoses: d.availableDoses,
      }));

    res.json({
      totalStudents,
      percentageStudentsVaccinated,
      upcomingVaccinationDrives,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
