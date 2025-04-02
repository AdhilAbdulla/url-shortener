const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api", urlRoutes);

// Default JSON response for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
