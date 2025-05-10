const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  vaccineTaken: [
    {
      vaccineName: String,
      vaccinationDriveId: mongoose.Schema.Types.ObjectId,
      vaccinationDate: Date,
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
