//jshint esversion: 6

const express = require("express");
const Alumni = require("../models/alumni");

const router = express.Router();

router.post("/add", (req, res, next) => {

    const alumnus = new Alumni({
      name: req.body.name,
      passingYear: req.body.year,
      linkedinURL: req.body.linkedinURL,
    });
    alumnus.save()
    .then(result => {
      res.status(201).json({
        message: "Alumnus created!",
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
  Alumni.findById(req.params.id).then(alumnus => {
    if (alumnus) {
      res.status(200).json(alumnus);
    }
    else {
      res.status(404).json({ message: "Alumnus not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Alumni.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Alumnus deleted!" });
  });
});

router.get("", (req, res, next) => {
  Alumni.find().then(documents => {
    res.status(200).json({
      message: "Al fetched successfully!",
      alumni: documents
    });
  });
});

router.put("/:id", (req, res, next) => {
  const project = new Projects({
    _id: req.body.id,
    name: req.body.name,
    passingYear: req.body.linkedinURL,
  });
  Projects.updateOne({_id: req.params.id}, project).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });

  });
});
module.exports = router;
