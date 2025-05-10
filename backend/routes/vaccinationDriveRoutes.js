const express = require("express");
const router = express.Router();
const {
  getDrives,
  addDrive,
  updateDrive,
} = require("../controllers/vaccinationDriveController");

router.get("/", getDrives);
router.post("/", addDrive);
router.put("/:id", updateDrive);

module.exports = router;
