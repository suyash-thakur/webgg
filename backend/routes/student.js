const express = require("express");
const Students = require("../models/students");

const router = express.Router();

router.post("/add", (req, res, next) => {
  const sutdent = new Students({
    name: req.body.name,
    passingYear: req.body.passingYear,
    skills: req.body.skills
  });
  sutdent.save()
  .then(result => {
    res.status(201).json({
      message: "Student created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

