const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
 // url: String
});

module.exports = mongoose.model('Image', imageSchema);
