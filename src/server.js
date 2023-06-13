const express = require('express');
const app = express();

// ! Routes
const routerKoder = require('./routes/koder.route.js');

app.use(express.json());
//Middleware de Routers
app.use('/koders', routerKoder);

/**
 * -> Aqui se ponen los middlewares (ejecucion)
 * -> Endpoint de home
 * -> Routear
 */

app.get('/', (req, res) => {
  res.json('Functioning API OK!');
});

// ! Exportar
// TODO Search es6 imports/exports -> module | actualmente estamos usando commonJS
module.exports = app;

// TODO traer un koder por su ID
