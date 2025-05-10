const express = require("express");
const router = express.Router();
const {
  getDrives,
  getDriveById,
  addDrive,
  updateDrive,
  getStudents,
} = require("../controllers/vaccinationDriveController");

router.get("/", getDrives);
router.get("/:id", getDriveById);
router.post("/", addDrive);
router.put("/:id", updateDrive);
router.get("/:id/students", getStudents);

module.exports = router;
