const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

// ✅ CORS CONFIGURATION (Allow frontend domain)
app.use(cors({
    origin: "https://url-shortener-du3dqcjih-jerryy.vercel.app", // Your frontend domain
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api", urlRoutes); // ✅ Ensure /api prefix is added

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
