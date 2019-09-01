const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {type: String, require: true},
  passingYear: {type: String, require: true},
  skills: [ {type: String} ],

});

module.exports = mongoose.model('Students', studentSchema);

