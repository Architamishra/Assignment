import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Stu.css";

function Stu() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
  });
  const [editingStudent, setEditingStudent] = useState(null); // Track editing state

  // Fetch students from the backend when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://assignment-brown-five.vercel.app//students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []); // Empty array means this effect runs only once when the component mounts

  const handleAddClick = () => {
    setNewStudent({ name: "", class: "", section: "", rollNumber: "" });
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEditClick = (student) => {
    setNewStudent({
      name: student.name,
      class: student.class,
      section: student.section,
      rollNumber: student.rollNumber,
    });
    setEditingStudent(student._id); // Track the ID of the student being edited
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent !== null) {
      // Update existing student
      try {
        const response = await axios.put(
          `https://assignment-brown-five.vercel.app//students/:rollnumber/${editingStudent}`, // Update endpoint with student ID
          newStudent
        );
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === editingStudent ? response.data.student : student
          )
        );
        console.log("Student Updated:", response.data.student);
      } catch (error) {
        console.error("Error updating student:", error);
      }
    } else {
      // Add new student
      try {
        const response = await axios.post(
          "https://assignment-brown-five.vercel.app//students", // POST endpoint for adding a new student
          newStudent
        );
        setStudents([...students, response.data.student]);
        console.log("New Student Added:", response.data.student);
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
    setShowModal(false);
    setNewStudent({ name: "", class: "", section: "", rollNumber: "" });
    setEditingStudent(null); // Reset editing state
  };

  const handleDeleteClick = async (studentId) => {
    try {
      await axios.delete(
        `https://assignment-brown-five.vercel.app//students/delStudent/:id/${studentId}`
      ); // DELETE endpoint with student ID
      setStudents(students.filter((s) => s._id !== studentId));
      alert(`Deleted student with ID: ${studentId}`);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  return (
    <div className="stu-container">
      <h2>Student Details</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button
                  onClick={() =>
                    alert(`Viewing details of student with ID: ${student._id}`)
                  }
                  className="view-btn"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditClick(student)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(student._id)} // Delete with student ID
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddClick} className="add-btn">
        Add
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {editingStudent !== null ? "Edit Student" : "Add New Student"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Class:</label>
                <input
                  type="text"
                  name="class"
                  value={newStudent.class}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Section:</label>
                <input
                  type="text"
                  name="section"
                  value={newStudent.section}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Roll Number:</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={newStudent.rollNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">
                {editingStudent !== null ? "Update" : "Submit"}
              </button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stu;
