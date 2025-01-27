import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controller/student.controller.js";

const router = express.Router();

// Create a new student
router.post("/", createStudent);

// Get all students
router.get("/", getAllStudents);

// Get student by ID
router.get("/:id", getStudentById);

// Update student details
router.put("/:rollNumber", updateStudent);

// Delete a student
router.delete("/rollnumber", deleteStudent);

export default router;
