var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const ventasSchema = require("../db/models/ventas");
var verify = require('../middlewareLogin');
require("dotenv").config()
const uri = process.env.mongoURL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, dbName: "Curso" };



router.get('/venta', verify, async (req, res, next) => {
    try {
        await mongoose.connect(uri, clientOptions);
        let ventas = await ventasSchema.find().populate('vehiculo');
        res.status(200).json({
            ventas: ventas
        });
    } catch (error) {
        res.status(500).json(error)
    } finally {
       //await mongoose.disconnect();
    }
});


router.post('/venta', verify, async (req, res, next) => {
    try {
        await mongoose.connect(uri, clientOptions);
        let venta = await ventasSchema(req.body);
        await venta.save();
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json(error)
    } finally {
        //await mongoose.disconnect();
    }
});


router.put('/venta/:id', verify, async (req, res, next) => {
    try {
        await mongoose.connect(uri, clientOptions);
        let venta = await ventasSchema.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, req.body)
        res.status(200).json(venta)
    } catch (error) {
        res.status(500).json(error)
    } finally {
       // await mongoose.disconnect();
    }
});


router.delete('/venta/:id', verify, async (req, res, next) => {
    try {
        await mongoose.connect(uri, clientOptions);
        let venta = await ventasSchema.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.status(200).json(venta)
    } catch (error) {
        res.status(500).json(error)
    } finally {
       // await mongoose.disconnect();
    }
});

module.exports = router;
