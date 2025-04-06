const mongoose = require("mongoose");
require("dotenv").config()
const uri = process.env.mongoURL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports.connectionMongo = async () => {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
       await mongoose.disconnect();
    }
}


