const mongoose = require('mongoose');

const usuario = encodeURIComponent(process.env.DB_USUARIO);
const senha = encodeURIComponent(process.env.DB_SENHA);
const nomeBanco = encodeURIComponent(process.env.DB_NOME);
const host = encodeURIComponent(process.env.DB_HOST);

mongoose.connect(`mongodb://${usuario}:${senha}@${host}:27017/${nomeBanco}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
