const { Router } = require('express');
const productos = Router();
const fs = require('fs');


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
    constructor(data){
        this.data = data;
    }

    theArray(){
        let file = fs.readFileSync(`./dataBase/productos.json`, 'utf-8');
        return file;
    }

    getById(numero){
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
        
        let id = "id";
        
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

module.exports = productos;
