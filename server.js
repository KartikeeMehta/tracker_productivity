// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize dotenv to read .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string from .env file
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
