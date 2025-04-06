var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const userSchema = require("../db/models/users.js");
require("dotenv").config()
const uri = process.env.mongoURL;
const secretKey = process.env.secretKey;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, dbName: "Curso" };



router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  await mongoose.connect(uri, clientOptions);
  if (!username || !password) {
    return res.status(400).json({ message: 'Falta username o password' });
  }
  try {
    // Verifica si el usuario ya existe
    await userSchema.findOne({ username: username }).then(async (a) => {

      if (a) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, password: hashedPassword };

      let user = await userSchema(newUser);
      await user.save();
      res.json({ message: 'Usuario registrado exitosamente' });

    });

  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: err });
  } finally {
    await mongoose.disconnect();
  }
});


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  await mongoose.connect(uri, clientOptions);
  if (!username || !password) {
    return res.status(400).json({ message: 'Falta username o password' });
  }
  try {
    await userSchema.findOne({ username: username }).then(async (user) => {

      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      // Compara la contraseña ingresada con la hasheada en la BD
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      // Genera el token con la información del usuario y con expiración de 1 hora
      const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
      console.log(token)
      res.json({ token });
    })
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err });
  } finally {
   // await mongoose.disconnect();
  }
});


router.delete('/user', function (req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
