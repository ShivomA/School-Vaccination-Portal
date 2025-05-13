const Student = require("../models/Student");
const VaccinationDrive = require("../models/VaccinationDrive");

// GET /api/vaccination-drives
exports.getDrives = async (req, res) => {
  try {
    const drives = await VaccinationDrive.find().sort({ driveDate: 1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vaccination drives" });
  }
};

// GET /api/vaccination-drives/:id
exports.getDriveById = async (req, res) => {
  try {
    const drive = await VaccinationDrive.findById(req.params.id);
    if (!drive) return res.status(404).json({ error: "Drive not found" });
    res.json(drive);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vaccination drive" });
  }
};

// POST /api/vaccination-drives
exports.addDrive = async (req, res) => {
  try {
    const { driveDate } = req.body;

    // Validate: Date should be at least 15 days in future
    const dateDiff = new Date(driveDate) - new Date();
    if (dateDiff < 15 * 24 * 60 * 60 * 1000) {
      return res.status(400).json({
        error: "Drive must be scheduled at least 15 days in advance.",
      });
    }

    const drive = new VaccinationDrive(req.body);
    await drive.save();
    res.status(201).json(drive);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create drive", details: error.message });
  }
};

// PUT /api/vaccination-drives/:id
exports.updateDrive = async (req, res) => {
  try {
    const { driveDate } = req.body;

    const drive = await VaccinationDrive.findById(req.params.id);
    if (!drive) return res.status(404).json({ error: "Drive not found" });

    if (new Date(drive.driveDate).getTime() !== new Date(driveDate).getTime()) {
      // Validate: Date should be at least 15 days in future
      const dateDiff = new Date(driveDate) - new Date(drive.driveDate);
      if (dateDiff < 15 * 24 * 60 * 60 * 1000) {
        return res.status(400).json({
          error: "Drive must be scheduled at least 15 days in advance.",
        });
      }
    }

    if (new Date(drive.driveDate) < new Date()) {
      return res.status(403).json({ error: "Past drives cannot be edited" });
    }

    Object.assign(drive, req.body);
    drive.lastUpdated = Date.now();
    await drive.save();

    res.json(drive);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update drive", details: error.message });
  }
};

// GET /api/vaccination-drives/:id/students
exports.getStudents = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the vaccination drive
    const drive = await VaccinationDrive.findById(id);
    if (!drive) return res.status(404).json({ error: "Drive not found" });

    // Get students whose grade is in drive.applicableGrades
    const students = await Student.find({
      grade: { $in: drive.applicableGrades },
    });

    res.json(students);
  } catch (err) {
    console.error("Error fetching applicable students:", err);
    res.status(500).json({ error: "Failed to fetch applicable students" });
  }
};
