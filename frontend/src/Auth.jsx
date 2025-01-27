import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Import the CSS file

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "", // Add name to the formData state
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Moved navigate here

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setFormData({ fullname: "", email: "", password: "" }); // Reset form data when toggling
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // For login, you only need email and password
    const userInfo = {
      email: formData.email,
      password: formData.password,
    };

    // For signup, include fullname
    if (isSignup) {
      userInfo.fullname = formData.fullname;
    }

    try {
      const response = isSignup
        ? await axios.post("http://localhost:4001/user/signup", userInfo)
        : await axios.post("http://localhost:4001/user/login", userInfo); // Use a separate route for login

      console.log(response.data);
      navigate("/student"); // Corrected path to lowercase 'student'

      alert(isSignup ? "Signup successful!" : "Login successful!");

      // Optionally, store user info in localStorage (for login) or redirect to another page
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (err) {
      console.log(err);
      alert(
        "Error: " +
          (err.response?.data?.message || err.message || "Unknown error")
      );
    }
  };

  return (
    <div className="app-container">
      {!isSignup ? (
        <div className="form-container">
          <h2 className="form-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Login
            </button>
          </form>
          <p className="form-footer">
            Don't have an account?{" "}
            <button onClick={toggleSignup} className="form-link">
              Create account
            </button>
          </p>
        </div>
      ) : (
        <div className="form-container">
          <h2 className="form-heading">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname" className="form-label">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                className="form-input"
                placeholder="Enter your name"
                value={formData.fullname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Signup
            </button>
          </form>
          <p className="form-footer">
            Already have an account?{" "}
            <button onClick={toggleSignup} className="form-link">
              Login here
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
