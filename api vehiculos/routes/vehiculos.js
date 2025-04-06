var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const vehiculosSchema = require("../db/models/vehiculos");
var verify = require('../middlewareLogin');
require("dotenv").config()
const uri = process.env.mongoURL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, dbName: "Curso" };



router.get('/vehiculo', verify, async (req, res, next) => {
  try {
    await mongoose.connect(uri, clientOptions);
    let vehiculos = await vehiculosSchema.find();
    res.status(200).json({
      vehiculos: vehiculos
    });
  } catch (error) {
    res.status(500).json(error)
  } finally {
    //await mongoose.disconnect();
  }
});


router.post('/vehiculo', verify, async (req, res, next) => {
  try {
    let vehiculo = await vehiculosSchema(req.body);
    await vehiculo.save();
    res.status(200).json(vehiculo);
  } catch (error) {
    res.status(500).json(error)
  } finally {
    //await mongoose.disconnect();
  }
});


router.put('/vehiculo/:id', verify, async (req, res, next) => {
  try {
    await mongoose.connect(uri, clientOptions);
    let vehiculo = await vehiculosSchema.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, req.body)
    res.status(200).json(vehiculo)
  } catch (error) {
    res.status(500).json(error)
  } finally {
    //await mongoose.disconnect();
  }
});


router.delete('/vehiculo/:id', verify, async (req, res, next) => {
  try {
    await mongoose.connect(uri, clientOptions);
    let vehiculo = await vehiculosSchema.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    res.status(200).json(vehiculo)
  } catch (error) {
    res.status(500).json(error)
  } finally {
    //await mongoose.disconnect();
  }
});

module.exports = router;
