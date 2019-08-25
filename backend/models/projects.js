const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: {type: String, require},
  discription: {type: String, require},
  contributers: [{type: ObjectId, ref: 'students'}],
  type: {type: String, require},
  link: {type: String}
});

module.exports = mongoose.Schema('project', projectSchema);
