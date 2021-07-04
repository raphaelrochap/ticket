const mongoose = require('../database');

const TagSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Tag', TagSchema);
