const express = require("express");
const router = express.Router();
const {
  getStudents,
  addStudent,
  bulkAddStudents,
  updateStudent,
  vaccinateStudent,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/", addStudent);
router.post("/bulk", bulkAddStudents);
router.put("/:id", updateStudent);
router.put("/:id/vaccinate", vaccinateStudent);

module.exports = router;
