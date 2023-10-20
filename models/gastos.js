const mongoose = require('mongoose');

const gastosSchema = new mongoose.Schema({
  nameCost: String,
  amount: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Gastos', gastosSchema);