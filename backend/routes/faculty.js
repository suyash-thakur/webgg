const express = require("express");
const Faculty = require("../models/faculty");

const router = express.Router();

router.post("/add", (req, res, next) => {
  const faculty = new Faculty({
    name: req.body.name,
    designation: req.body.designation
  });
  faculty.save()
  .then(result => {
    res.status(201).json({
      message: "faculty created!",
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
    Faculty.findById(req.params.id).then(faculty => {
    if (faculty) {
      res.status(200).json(faculty);
    }
    else {
      res.status(404).json({ message: "Faculty not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Faculty.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Faculty deleted!" });
  });
});

router.get("", (req, res, next) => {
  Faculty.find().then(documents => {
    res.status(200).json({
      message: "Faculty fetched successfully!",
      faculty: documents
    });
  });
});

router.put("/:id", (req, res, next) => {
  const faculty = new Faculty({
    _id: req.body.id,
    name: req.body.name,
   designation: req.body.designation
  });

  Faculty.updateOne({_id: req.params.id}, faculty).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });

  });
});


module.exports = router;
