const mongoose = require('../database');
const Mensagem = require('./Mensagem');

const TicketSchema = new mongoose.Schema({
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
  ],
  assunto: {
    type: String,
    required: true,
  },
  mensagens: [
    {
      type: Mensagem,
      required: false,
    },
  ],
  criador: {
    type: String,
    required: true,
  },
  agente: {
    type: String,
    required: false,
    default: '',
  },
  usuario_atual: {
    type: String,
    required: false,
    default: '',
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
