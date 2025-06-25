const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contact, logo } = req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ error: "Company already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      contact,
      logo,
    });

    await newCompany.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newCompany._id, role: newCompany.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ message: "Company registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
