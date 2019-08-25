const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
  name: {type: String, require: true},
  designation: {type: String, require: true}
});

module.exports = mongoose.Schema('faculty', facultySchema);
