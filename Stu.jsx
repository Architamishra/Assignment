import React, { useState } from "react";
import "./Stu.css";

function Stu() {
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", class: "10", section: "A", rollNumber: "101" },
    { id: 2, name: "Jane Smith", class: "9", section: "B", rollNumber: "102" },
  ]);

  // Function to handle Add button click
  const handleAdd = () => {
    const newStudent = {
      id: students.length + 1,
      name: "New Student",
      class: "N/A",
      section: "N/A",
      rollNumber: "N/A",
    };
    setStudents([...students, newStudent]);
  };

  // Function to handle View button
  const handleView = (id) => {
    alert(`Viewing details of student with ID: ${id}`);
  };

  // Function to handle Edit button
  const handleEdit = (id) => {
    alert(`Editing details of student with ID: ${id}`);
  };

  // Function to handle Delete button
  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    alert(`Deleted student with ID: ${id}`);
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
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button
                  onClick={() => handleView(student.id)}
                  className="view-btn"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(student.id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd} className="add-btn">
        Add
      </button>
    </div>
  );
}

export default Stu;
