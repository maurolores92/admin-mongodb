const mongoose = require('mongoose');

const gastosSchema = new mongoose.Schema({
  id: Number,
  nameCost: String,
  amount: Number,
  createdDate: String
});

const Gastos = mongoose.model('gastos', gastosSchema);

module.exports = Gastos;