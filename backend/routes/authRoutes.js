const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Coder = require("../model/CoderModel");
const authMiddleware = require("../middleware/auth");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.post("/register", async (req, res) => {
  try {
    const { username, email, name, password } = req.body;

    const findCoder = await Coder.findOne({ username });

    if (findCoder)
      return res.status(400).json({ message: "Coder already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCoder = new Coder({
      username,
      email,
      name,
      password: hashedPassword,
    });

    await newCoder.save();

    res.status(201).json({
      message: "Coder registered successfully",
      coder: {
        username: newCoder.username,
        email: newCoder.email,
        name: newCoder.name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Occured" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const coder = await Coder.findOne({ username }).select("+password");

    if (!coder) {
      return res.status(401).json({ error: "Incorrect Username and Password" });
    }
    const isMatch = await bcrypt.compare(password, coder.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect Username and Password" });
    }

    const token = jwt.sign(
      { id: coder._id, username: coder.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      token,
      coder: { username: coder.username, email: coder.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error Occured" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/coder", authMiddleware, (req, res) => {
  res.json({ coder: req.coder });
});

module.exports = router;
