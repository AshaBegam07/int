const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://Ashabegam:ashabegam07@cluster0.bv80n.mongodb.net/interiorDesignDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("databases connected!"))
  .catch((err) => console.error(err));

// Schema and Model
const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  address: String,
  gender: String,
});

const Registration = mongoose.model("Registration", RegistrationSchema);

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).send("Registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/register", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api/register/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start server
const PORT =5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
