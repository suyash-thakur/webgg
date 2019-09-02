const express = require("express");
const Projects = require("../models/projects");

const router = express.Router();

router.post("/add", (req, res, next) => {
  const project = new Projects({
    title: req.body.title,
    discription: req.body.discription,
    contributers: req.body.contributers,
    type: req.body.type,
    link: req.body.link
  });
  project.save()
  .then(result => {
    res.status(201).json({
      message: "project created!",
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
  Projects.findById(req.params.id).then(project => {
    if (project ) {
      res.status(200).json(project);
    }
    else {
      res.status(404).json({ message: "project not found!" });
    }
  });
});


router.delete("/:id", (req, res, next) => {
  Projects.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Project deleted!" });
  });
});


router.get("", (req, res, next) => {
  Projects.find().then(documents => {
    res.status(200).json({
      message: "Projects fetched successfully!",
      projects: documents
    });
  });
});


router.put("/:id", (req, res, next) => {
  const project = new Projects({
    _id: req.body.id,
    title: req.body.title,
    discription: req.body.discription,
    contributers: req.body.contributers,
    type: req.body.type,
    link: req.body.link
  });
  Projects.updateOne({_id: req.params.id}, project).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });

  });
});

module.exports = router;
