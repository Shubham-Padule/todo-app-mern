const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

module.exports = app;
