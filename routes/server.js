const express = require('express');
const cors = require('cors');
const router = express.Router();
const mongoose = require('mongoose');
const Gastos = require('../models/gastos');
const Ingresos = require('../models/ingresos'); 
const app = express();


const user = 'maurolores92';
const password = 'HiXVJResJEW0NesK';
const mongoURI = `mongodb+srv://${user}:${password}@cluster.svbsvy0.mongodb.net/administracion?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

app.get('/gastos', async (req, res) => {
  try {
    const gastos = await Gastos.find(); 
    res.json(gastos);
  } catch (err) {
    console.error('Error al obtener gastos:', err);
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
});

app.post('/gastos', async (req, res) => {
  try {
    const newGasto = new Gastos({
      nameCost: req.body.nameCost,
      amount: req.body.amount,
    });
    const savedGasto = await newGasto.save();

    res.status(201).json(savedGasto);
  } catch (err) {
    console.error('Error al agregar gasto:', err);
    res.status(500).json({ error: 'Error al agregar gasto' });
  }
});

router.get('/ingresos', async (req, res) => {
  try {
    const ingresos = await Ingresos.find();
    res.json(ingresos);
  } catch (err) {
    console.error('Error al obtener ingresos:', err);
    res.status(500).json({ error: 'Error al obtener ingresos' });
  }
});

app.use('/', router);

app.listen(3001, () => {
  console.log('Servidor en ejecución en el puerto 3001');
});