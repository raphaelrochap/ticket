const mongoose = require('../database');

const MensagemSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});

module.exports = MensagemSchema;
