const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

// ✅ Allow CORS from all origins (Fixes your issue)
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
