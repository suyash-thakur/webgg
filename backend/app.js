const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const studentRoutes = require('./routes/student');
const projectRoutes = require('./routes/projects');


mongoose.connect(
  "mongodb://localhost:27017")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use('/student', studentRoutes);
app.use('/projects', projectRoutes);


module.exports = app;
