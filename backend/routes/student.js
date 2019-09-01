const express = require("express");
const Students = require("../models/students");

const router = express.Router();

router.post("/add", (req, res, next) => {
  const student = new Students({
    name: req.body.name,
    passingYear: req.body.year,
    skills: req.body.skills
  });
  student.save()
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

router.get("/:id", (req, res, next) => {
  Students.findById(req.params.id).then(student => {
    if (student) {
      res.status(200).json(student);
    }
    else {
      res.status(404).json({ message: "Student not found!" });
    }
  });
});


router.delete("/:id", (req, res, next) => {
  Students.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Student deleted!" });
  });
});


router.get("", (req, res, next) => {
  Students.find().then(documents => {
    res.status(200).json({
      message: "Students fetched successfully!",
      students: documents
    });
  });
});


router.put("/:id", (req, res, next) => {
  const student = new Students({
    _id: req.body.id,
    name: req.body.name,
    passingYear: req.body.year,
    skills: req.body.skills
  });
  Students.updateOne({_id: req.params.id}, student).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });

  });
});


module.exports = router;
