const mongoose = require('mongoose');

const ingresosSchema = new mongoose.Schema({
    id: Number,
    nameCost: String,
    amount: Number,
    createdDate: String
  });

const Ingresos = mongoose.model('ingresos', ingresosSchema);

module.exports = Ingresos;