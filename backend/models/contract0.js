const mongoose = require('mongoose');

const Contract0Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('contract0', Contract0Schema);
