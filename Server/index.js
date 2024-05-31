const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const EmployeeModel = require("./models/Employee.js");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Hashing function
const saltRounds = 10; // Number of salt rounds for bcrypt
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res.json("Success");
        } else {
          res.json("Password Incorrect");
        }
      } else {
        res.json("No record Existed");
      }
    })
    .catch((err) => res.status(500).json("Server Error"));
});

app.post("/register", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await hashPassword(password); // Hash the password
    const employee = await EmployeeModel.create({ ...req.body, password: hashedPassword });
    res.json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
