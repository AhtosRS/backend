// configuracion del server ------------------------------------------------------------------------------
const express = require('express');
const { param } = require('express/lib/request');
const { json } = require('express/lib/response');
const fs = require('fs');

const { Router } = express;

const app = express()
const carrito = Router()
const productos = Router()


app.use('/api', carrito, express.static(__dirname + '/public'));
app.use('/api', productos, express.static(__dirname + '/public'));

carrito.use(express.json());
productos.use(express.json());
productos.use(express.urlencoded({ extended: true}));
carrito.use(express.urlencoded({ extended: true}));


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))

//operaciones de la API ------------------------------------------------------------------------------> /productos

productos.get('/productos', (req, res) => {
    res.send(archivo.theArray());
})

productos.get('/productos/:id', (req, res) => {
    let id = req.params;
    res.send(archivo.getById(id.id));
})

productos.post('/productos', permission, (req, res) => {
    console.log("post request recibido");
    console.log(req.body)
    let prodRecibido = req.body;
    archivo.save(prodRecibido);
    res.send('producto enviado');
    
})

productos.put('/productos/:id', permission, (req, res) => {
    console.log("put request recibido");
    let id = req.params;
    let prodRecibido = req.body;
    res.send(archivo.modificar(id.id, prodRecibido));
    
})

productos.delete('/productos/:id', permission, (req, res) => {
    console.log("delete request recibido");
    let id = req.params;
    archivo.deleteById(id.id);
    res.send('producto borrado');
    
})

//operaciones de la API ------------------------------------------------------------------------------> /carrito

carrito.post('/carrito', (req, res) => {
    console.log("post request recibido");
    res.send(carrosFile.createNewCarro());
})















// ------------- middleware---------------

let admin = true;

function permission(req, res, next) {
    if (admin === true) {
        next();
    }
    else {
        console.log('no tenes permisos para realizar esta accion')
    }
}

//logica ------------------------------------------------------------------------------ PRODUCTOS

let products = [];

class Contenedor {
    constructor(data){
        this.data = data;
    }

    theArray(){
        let file = fs.readFileSync(`./dataBase/productos.json`, 'utf-8');
        return file;
    }

    getById(numero){
        //recibe un numero de id, y devuelve el objeto con ese id o null si no esta
        let file = fs.readFileSync(`./dataBase/productos.json`, 'utf-8');

        numero = parseInt(numero);
        let existe = null;
        let elegido = "";
        file = JSON.parse(file);
        file.forEach(element => {
            if (element.id === numero){
                existe = true;
                elegido = file.find( x => x.id === numero);
                console.log(elegido);
            }
        });
        if (existe === null) {
            console.log(existe);
            let noEncontrado = {error: 'producto no encontrado'}
            return(noEncontrado)
        } else {
            return(elegido)
        }
    }

    save(objeto) {
        //recibe objeto, lo guarda en el archivo, asigna un id y devuelve el id
        let id = "id";
        let file = fs.readFileSync(`./dataBase/productos.json`, 'utf-8');

        if (file.length === 0) {
            objeto[id] = 1;
            products.push(objeto)
            fs.writeFileSync('./dataBase/productos.json', JSON.stringify(products));
            return("objeto agregado con exitos")
        } else {
            file = JSON.parse(file);
            let index = file.findIndex(object => object.title === objeto.title);
            if (index === -1){
                let ultimo = file.length - 1;
                console.log(file[ultimo].id);
                objeto[id] = file[ultimo].id + 1;
                file.push(objeto)
                fs.writeFileSync('./dataBase/productos.json', JSON.stringify(file));
                return("objeto agregado con exito")
            } else {
                console.log(`${objeto.title} ya existe en el array`);
                return(`${objeto.title} ya existe en el array`)
            }
        }
    }

    modificar(numeroID, objetoNew){
        let file = fs.readFileSync(`./dataBase/productos.json`, 'utf-8');
        file = JSON.parse(file);
        //recibe un numero de id, y devuelve el objeto con ese id o null si no esta
        let id = "id";
        //console.log(numeroID);
        numeroID = parseInt(numeroID);
        let index = file.findIndex(prods => {
            return prods.id === numeroID;
        });
        objetoNew[id] = numeroID;
        file[index] = objetoNew;
        fs.writeFileSync('./dataBase/productos.json', JSON.stringify(file));
        return("producto modificado con exito");
    }

    deleteById(numeroID) {
        let file = fs.readFileSync(`./dataBase/productos.json`, 'utf-8');
        file = JSON.parse(file);
        //elimina del archivo el objeto buscado segun el mumero de id
        let eliminado = {};
        numeroID = parseInt(numeroID);
        file.forEach(element => {
            if (element.id === numeroID){
                let elegido = file.findIndex( x => x.id === numeroID);
                eliminado = file.splice(elegido, 1);
                console.log(`se elimino: ${JSON.stringify(eliminado)}`);
            }
        });
        fs.writeFileSync('./dataBase/productos.json', JSON.stringify(file));
        return(`producto eliminado con exito`);
    }  
}

let archivo = new Contenedor("productos");

//logica ------------------------------------------------------------------------------ carrito

let carros = [];

class ContenedorCarros {
    constructor(data){
        this.data = data;
    }

    createNewCarro() {
        let fileCarros = fs.readFileSync('./dataBase/carritos.json', 'utf-8');
        let today = new Date().toLocaleString();
        
        if (fileCarros.length === 0) {
            let newCarro = {id: "1", timestamp: `${today}`, productos: " "}
            fileCarros = [];
            carros.push(newCarro);
            fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(carros));
            return("carro agregado con exitos")
        } else {
            fileCarros = JSON.parse(fileCarros);
            let lastCarro = fileCarros[fileCarros.length - 1];
            let idLastCarro = lastCarro.id;
            let newCarro = {id: `${parseInt(idLastCarro) + 1}`, timestamp: `${today}`, productos: " "}
            carros.push(newCarro);
            fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(carros));
            return("carro agregado con exitos")
        }
    }


    saveCarro(objeto) {
        //recibe objeto, lo guarda en el archivo, asigna un id y devuelve el id
        let id = "id";
        let fileProductos = fs.readFileSync('./dataBase/productos.json', 'utf-8');
        let fileCarros = fs.readFileSync('./dataBase/carritos.json', 'utf-8');

        fileCarros = JSON.parse(fileCarros);
        fileProductos = JSON.parse(fileProductos);

        

        if (fileCarros.length === 0) {
            objeto[id] = 1;
            carros.push(objeto)
            fs.writeFileSync('./dataBase/productos.json', JSON.stringify(products));
            return("objeto agregado con exitos")
        } else {
            
            let index = file.findIndex(object => object.title === objeto.title);
            if (index === -1){
                let ultimo = file.length - 1;
                console.log(file[ultimo].id);
                objeto[id] = file[ultimo].id + 1;
                file.push(objeto)
                fs.writeFileSync(`./dataBase/carritos.json`, 'utf-8', JSON.stringify(file));
                return("objeto agregado con exito")
            } else {
                console.log(`${objeto.title} ya existe en el array`);
                return(`${objeto.title} ya existe en el array`)
            }
        }
    }

    
}

let carrosFile = new ContenedorCarros("carros");

