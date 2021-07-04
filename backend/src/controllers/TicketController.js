const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

module.exports = {
  async getAll(req, res) {
    const tickets = await Ticket.find({}).populate('tags');

    return res.json(tickets);
  },

  async store(req, res) {
    const { tags, assunto, mensagens, criador, usuario_atual } = req.body;

    if (!tags || !assunto || !mensagens || !criador)
      return res
        .status(422)
        .send({ error: 'Não foram enviados todos os campos obrigatórios' });

    const ticket = await Ticket.create({
      tags,
      assunto,
      mensagens,
      criador,
      usuario_atual,
    });

    return res.status(200).json(ticket);
  },

  async getIndex(req, res) {
    const { ticketId } = req.query;

    try {
      const ticket = await Ticket.findOne({
        _id: mongoose.Types.ObjectId(ticketId),
      }).populate('tags');

      return res.json(ticket);
    } catch (err) {
      return res.status(400).send({
        error:
          'Não foi possível encontrar o ticket, tente novamente em instantes',
      });
    }
  },

  async delete(req, res) {
    const { ticketId } = req.params;

    try {
      if (!(await Ticket.findOne({ _id: mongoose.Types.ObjectId(ticketId) })))
        return res
          .status(400)
          .send({ error: 'Não foi possível encontrar a Ticket informado' });

      await Ticket.deleteOne({ _id: mongoose.Types.ObjectId(ticketId) });

      return res.status(200).send({ msg: 'Ticket deletado com sucesso!' });
    } catch (err) {
      return res.status(400).send({
        msg: 'Não foi possível atualizar o Ticket, tente novamente em instantes',
      });
    }
  },

  async update(req, res) {
    const { ticketId } = req.params;
    const { assunto, mensagens, criador, agente, usuario_atual } = req.body;

    if (!assunto || !mensagens || !criador || !agente || !usuario_atual)
      return res.status(422).send({ error: 'Não foram enviados todos os campos obrigatórios' });

    try {
      if (!(await Ticket.findOne({ _id: mongoose.Types.ObjectId(ticketId) })))
        return res
          .status(400)
          .send({ error: 'Não foi possível encontrar o Ticket informado' });

      await Ticket.updateOne(
        { _id: mongoose.Types.ObjectId(ticketId) },
        {
           assunto, mensagens, criador, agente, usuario_atual,
        },
      );

      return res.status(200).send({ msg: 'Ticket atualizado com sucesso!' });
    } catch (err) {
      return res.status(400).send({
        msg: 'Não foi possível atualizar o Ticket, tente novamente em instantes',
      });
    }
  },
};
