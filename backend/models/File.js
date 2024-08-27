const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileKey: { type: String, required: true }
});

module.exports = mongoose.model('File', fileSchema);
