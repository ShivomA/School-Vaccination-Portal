const Student = require("../models/Student");

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
