import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Import routes
import userRoute from "./route/user.route.js";
import studentRoute from "./route/student.route.js"; // Import student routes

app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 4000;

const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Use routes
app.use("/user", userRoute);
app.use("/students", studentRoute); // Add student routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
