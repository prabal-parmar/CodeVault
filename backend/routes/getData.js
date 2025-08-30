const express = require("express");
const router = express.Router();
const Coder = require("../model/CoderModel");
const authMiddleware = require("../middleware/auth");
require("dotenv").config();

router.get("/allcodes", authMiddleware, async (req, res) => {
  try {
    const coderId = req.coder.id
    if(!coderId){
      return res.status(404).json({error: "coder not found"})
    }

    const coder = await Coder.findById(coderId)

    if(!coder) {
      return res.status(404).json({error: "Coder not registered"})
    }
    
    const allCodes = coder.generatedCodes
    res.json({message: "Codes Fetched", codes: allCodes})

  } catch (error) {
    console.error("Error fetching all codes:")
    res.status(500).json({ error: "Server error while fetching codes" })
  }
})

router.post("/addCode", authMiddleware, async (req, res) => {
  try {
    const coderId = req.coder.id;
    const { question, hint, answer } = req.body;
    if (!coderId) {
      return res.status(404).json({ error: "some error occured" });
    }
    if (!question) {
      return res.status(404).json({ error: "No question given" });
    }
    const updateCodes = await Coder.findByIdAndUpdate(
      coderId,
      { $push: { generatedCodes: { question, hint, answer } } },
      { new: true }
    );

    if (!updateCodes) {
      return res.status(404).json({ error: "Coder not found" });
    }

    res.json({
      message: "Code added to db",
      allCodes: updateCodes.generatedCodes
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occured while adding code" });
  }
});

router.post('/update-avatar', authMiddleware, async (req, res) => {
  try {
    const coderId = req.coder.id
    const {avatar} = req.body

    const coder = await Coder.findByIdAndUpdate(coderId, 
      { $set: { avatar: avatar } },
      { new: true }
    )

    if(!coder){
      return res.status(404).json({error: "Coder not found"})
    }
    res.status(200).json({ message: "Avatar updated", coder });
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})

module.exports = router
