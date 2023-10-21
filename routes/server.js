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

function generateUniqueID() {
  return Math.floor(Math.random() * 1000);
}

router.get('/gastos', async (req, res) => {
  try {
    const gastos = await Gastos.find();
    res.json(gastos);
  } catch (err) {
    console.error('Error al obtener gastos:', err);
    res.status(500).json({ error: 'Error al obtener gastos' });
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

app.post('/gastos', async (req, res) => {
  try {
    const newGasto = new Gastos({
      nameCost: req.body.nameCost,
      amount: req.body.amount,
      createDate: new Date(),
    });

    newGasto.id = generateUniqueID();

    const savedGasto = await newGasto.save();

    res.status(201).json(savedGasto);
  } catch (err) {
    console.error('Error al agregar gasto:', err);
    res.status(500).json({ error: 'Error al agregar gasto' });
  }
});

app.post('/ingresos', async (req, res) => {
  try {
    const newIngreso = new Ingresos({
      nameCost: req.body.nameCost,
      amount: req.body.amount,
      createDate: new Date(),
    });

    newIngreso.id = generateUniqueID();

    const savedIngreso = await newIngreso.save();

    res.status(201).json(savedIngreso);
  } catch (err) {
    console.error('Error al agregar ingreso:', err);
    res.status(500).json({ error: 'Error al agregar ingreso' });
  }
});

app.delete('/ingresos/:id', async (req, res) => {
  const ingresoId = req.params.id;

  try {
    const deletedIngreso = await Ingresos.findOneAndDelete({ id: ingresoId });

    if (deletedIngreso) {
      res.status(200).json(deletedIngreso);
    } else {
      res.status(404).json({ error: 'Ingreso no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar el ingreso:', err);
    res.status(500).json({ error: 'Error al eliminar el ingreso' });
  }
});

const api = require('./api');
app.use('/', api);

app.use('/', router);
app.listen(3001, () => {
  console.log('Servidor en ejecución en el puerto 3001');
});
