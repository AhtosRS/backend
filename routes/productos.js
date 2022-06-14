import knex from "knex";
import { options } from "../DB/configDB.js";
const { Router } = require('express');
const productos = Router();

//const fs = require('fs');


productos.get('/', (req, res) => {
    res.send(archivo.theArray());
})

productos.get('/:id', (req, res) => {
    let id = req.params;
    res.send(archivo.getById(id.id));
})

productos.post('/', permission, (req, res) => {
    console.log("post request recibido");
    console.log(req.body)
    let prodRecibido = req.body;
    archivo.save(prodRecibido);
    res.send('producto enviado');
})

productos.put('/:id', permission, (req, res) => {
    console.log("put request recibido");
    let id = req.params;
    let prodRecibido = req.body;
    res.send(archivo.modificar(id.id, prodRecibido));
    
})

productos.delete('/:id', permission, (req, res) => {
    console.log("delete request recibido");
    let id = req.params;
    archivo.deleteById(id.id);
    res.send('producto borrado');
})


// ------------- middleware--------------- ADMIN o USER 

let admin = true;

function permission(req, res, next) {
    if (admin === true) {
        next();
    }
    else {
        console.log('no tenes permisos para realizar esta accion')
    }
}

// --------------- logica -----------------------
let products = [];

class Contenedor {
    constructor(options, table){
        this.knex = knex(options);
        this.table = table;
    }

    theArray(){
        let file = this.knex.from(this.table).select("*");
        return file;
    }

    getById(numero){
        numero = parseInt(numero);
        let productByID = this.knex.from(this.table).select("*").where('id', numero);
        return productByID;
    }

    save(objeto) {
        let objetoNew = this.knex.from(this.table).insert(objeto);
        console.log("objeto agregado con exito")
        return objetoNew;
    }

    modificar(numeroID, objetoNew){
        let editado = this.knex.from(this.table).where('id', id).insert(objetoNew);
        return('objeto borrado con exito')
        
    }

    deleteById(numeroID) {
        let objetoBorrado = this.knex.from(this.table).where('id', id).del();

        return objetoBorrado;
    }  
}

let archivo = new Contenedor("productos");

module.exports = productos;
