const express = require("express");
const router = express.Router();
const {
  getStudentsReport,
  getVaccinationDrivesReport,
} = require("../controllers/reportController");

router.get("/students", getStudentsReport);
router.get("/vaccination-drives", getVaccinationDrivesReport);

module.exports = router;
