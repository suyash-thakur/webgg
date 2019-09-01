const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: {type: String, require: true},
  discription: {type: String, require: true},
  contributers:  [ {type: String} ],
  type: {type: String, require: true},
  link: {type: String},
});

module.exports = mongoose.model('project', projectSchema);
