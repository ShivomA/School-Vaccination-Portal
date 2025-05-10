const mongoose = require("mongoose");

const vaccinationDriveSchema = new mongoose.Schema({
  driveName: { type: String, required: true },
  vaccineName: { type: String, required: true },
  driveDate: { type: Date, required: true },
  location: { type: String, required: true },
  applicableGrades: [{ type: String, required: true }],
  vaccinatedStudentIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ],
  availableDoses: { type: Number, required: true, min: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("vaccinationDrive", vaccinationDriveSchema);
