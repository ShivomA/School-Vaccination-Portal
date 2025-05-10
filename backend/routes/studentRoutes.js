const express = require("express");
const router = express.Router();
const {
  getStudents,
  addStudent,
  bulkAddStudents,
  updateStudent,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/", addStudent);
router.post("/bulk", bulkAddStudents);
router.put("/:id", updateStudent);

module.exports = router;
