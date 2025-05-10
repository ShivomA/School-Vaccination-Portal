const Student = require("../models/Student");
const VaccinationDrive = require("../models/VaccinationDrive");

// GET /api/students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ lastUpdated: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// POST /api/students
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add student", details: error.message });
  }
};

// POST /api/students/bulk
exports.bulkAddStudents = async (req, res) => {
  const { students } = req.body;

  if (!Array.isArray(students)) {
    return res.status(400).json({ message: "Invalid students data" });
  }

  try {
    const newStudents = await Student.insertMany(students);
    res.status(201).json(newStudents);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add students", details: error.message });
  }
};

// PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update student", details: error.message });
  }
};

// PUT /api/students/:id/vaccinate
exports.vaccinateStudent = async (req, res) => {
  const { id } = req.params;
  const { vaccineName, vaccinationDriveId } = req.body;

  if (!vaccineName) {
    return res.status(400).json({ error: "Missing vaccine name" });
  }
  if (!vaccinationDriveId) {
    return res.status(400).json({ error: "Missing vaccination drive id" });
  }

  try {
    const student = await Student.findById(id);
    const drive = await VaccinationDrive.findById(vaccinationDriveId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const alreadyVaccinated = student.vaccineTaken.some(
      (v) => v.vaccinationDriveId.toString() === vaccinationDriveId
    );

    if (alreadyVaccinated) {
      return res
        .status(400)
        .json({ error: "Student already vaccinated for this drive" });
    }

    if (!drive) {
      return res.status(404).json({ error: "Vaccination drive not found" });
    }

    if (drive.availableDoses <= 0) {
      return res.status(400).json({ error: "No vaccine doses left" });
    }

    // Add vaccine to student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $push: {
          vaccineTaken: {
            vaccineName,
            vaccinationDriveId,
            vaccinationDate: Date.now(),
          },
        },
      },
      { new: true }
    );

    // Decrement vaccine count and add student id
    await VaccinationDrive.findByIdAndUpdate(vaccinationDriveId, {
      $inc: { availableDoses: -1 },
      $addToSet: { vaccinatedStudentIds: id }, // prevents duplicates
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error("Vaccination error:", error);
    res.status(500).json({ message: "Failed to mark as vaccinated" });
  }
};
