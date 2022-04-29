const express = require('express');
const fs = require('fs');

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))

app.get('/productos', (req, res) => {
    res.send(archivo.theArray());
})

app.get('/productosRandom', (req, res) => {
    res.send(archivo.randomizador());
})

class Contenedor {
    constructor(data){
        this.data = data;
    }

    theArray(){
        let file = fs.readFileSync(`${this.data}.txt`, 'utf-8')
        return file;
    }
    randomizador(){
        let file = JSON.parse(fs.readFileSync(`${this.data}.txt`, 'utf-8'))
        let elElegido = file[Math.floor(Math.random()*file.length)];
        return elElegido;
    }
}

let archivo = new Contenedor("productos");
