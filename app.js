const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Import Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
