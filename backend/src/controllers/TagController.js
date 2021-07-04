const Tag = require('../models/Tag');
const mongoose = require('mongoose');

module.exports = {
  async getAll(req, res) {
    const tags = await Tag.find({});

    return res.json(tags);
  },

  async store(req, res) {
    const { descricao } = req.body;

    if (!descricao)
      return res.status(422).send({ error: 'O campo descrição é obrigatório' });

    const tag = await Tag.create({
      descricao,
    });

    return res.status(200).json(tag);
  },

  async update(req, res) {
    const { tagId } = req.params;
    const { descricao } = req.body;

    if (!descricao)
      return res.status(422).send({ error: 'O campo descrição é obrigatório' });

    try {
      if (!(await Tag.findOne({ _id: mongoose.Types.ObjectId(tagId) })))
        return res
          .status(400)
          .send({ error: 'Não foi possível encontrar a tag informada' });

      await Tag.updateOne(
        { _id: mongoose.Types.ObjectId(tagId) },
        {
          descricao,
        },
      );

      return res.status(200).send({ msg: 'Tag atualizada com sucesso!' });
    } catch (err) {
      return res.status(400).send({
        msg: 'Não foi possível atualizar a Tag, tente novamente em instantes',
      });
    }
  },

  async delete(req, res) {
    const { tagId } = req.params;

    try {
      if (!(await Tag.findOne({ _id: mongoose.Types.ObjectId(tagId) })))
        return res
          .status(400)
          .send({ error: 'Não foi possível encontrar a tag informada' });

      await Tag.deleteOne({ _id: mongoose.Types.ObjectId(tagId) });

      return res.status(200).send({ msg: 'Tag deletada com sucesso!' });
    } catch (err) {
      return res.status(400).send({
        msg: 'Não foi possível atualizar a Tag, tente novamente em instantes',
      });
    }
  },

  async getIndex(req, res) {
    const { tagId } = req.query;

    try {
      const tag = await Tag.findOne({ _id: mongoose.Types.ObjectId(tagId) });

      return res.json(tag);
    } catch (err) {
      return res.status(400).send({
        error: 'Não foi possível encontrar a Tag, tente novamente em instantes',
      });
    }
  },
};
