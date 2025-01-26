import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import userRoute from "./route/user.route.js";

app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 4000;

const URI = process.env.MongoDBURI;

// Connect to MongoDB
try {
  mongoose.connect(URI);
  console.log("connected to mongodb");
} catch (error) {
  console.log("Error:", error);
}

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
