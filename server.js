// configuracion del server ------------------------------------------------------------------------------
const express = require('express');
const { param } = require('express/lib/request');
const { json } = require('express/lib/response');

const app = express()

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))

//operaciones de la API ------------------------------------------------------------------------------

app.get('/home', function(req, res){
    res.render('pages/index')
})

app.get('/list', function(req, res){
    res.render('pages/list')
})

let memoria = [];


app.post('/home', function(req, res){
    console.log("post request recibido");
    console.log(req.body)
    let producto = req.body;
    memoria.push(producto);
    console.log(memoria);
})

app.get('/home', function(req, res){
    res.render('pages/list', {memoria: memoria})
})
















