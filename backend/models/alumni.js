const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema({
  name: {type: String, require},
  passingYear: {type: String, require},
  linkedinURL: {type: String, require}
});

module.exports = mongoose.model('alumni', alumniSchema);
