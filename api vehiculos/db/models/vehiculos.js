const mongoose = require("mongoose");

const vehiculosSchema = mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Vehiculos", vehiculosSchema);