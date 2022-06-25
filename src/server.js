import express from 'express'
import routesCarritos from './routes/routesCarritos.js'
import routesProductos from './routes/routesProductos.js'

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', routesProductos)
app.use('/carritos', routesCarritos)


const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor ON en puerto:${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`))