import React, { useState } from "react";
import "./slider.css";
import { useNavigate } from "react-router-dom";

function Student() {
  const [selectedOption, setSelectedOption] = useState("Student"); // Track selected option
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    if (option === "Student") {
      navigate("/stu"); // Navigate to Stu when "Student" is selected
    } else if (option === "Logout") {
      navigate("/"); // Navigate to home/Auth when "Logout" is selected
    }
  };

  return (
    <div>
      {/* Slider */}
      <div className="slider">
        <button
          className={`slider-option ${
            selectedOption === "Student" ? "active" : ""
          }`}
          onClick={() => handleOptionChange("Student")}
        >
          Student
        </button>
        <button
          className={`slider-option ${
            selectedOption === "Logout" ? "active" : ""
          }`}
          onClick={() => handleOptionChange("Logout")}
        >
          Logout
        </button>
      </div>

      {/* Display content based on selected option */}
      <div className="slider-content">
        {selectedOption === "Student" ? (
          <h1>Welcome Student!</h1>
        ) : (
          <h1>You have logged out!</h1>
        )}
      </div>
    </div>
  );
}

export default Student;
