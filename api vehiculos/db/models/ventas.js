const mongoose = require("mongoose");

const ventasSchema = mongoose.Schema({
    nombre_comprador: {
        type: String,
        required: true
    },
    nombre_vendedor: {
        type: String,
        required: true
    },
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehiculos',
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Ventas", ventasSchema);