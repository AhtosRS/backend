// configuracion del server ------------------------------------------------------------------------------
const express = require('express');
const { route } = require('express/lib/application');
const { param } = require('express/lib/request');
const { json } = require('express/lib/response');

const routesProductos = require('./routes/carritos')
const routeCarritos = require('./routes/productos')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/carrito', routesProductos);
app.use('/api/productos', routeCarritos);


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))




