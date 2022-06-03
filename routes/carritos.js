const { Router } = require('express');
const carrito = Router();
const fs = require('fs');




carrito.post('/', (req, res) => {
    console.log("post request recibido");
    res.send(carrosFile.createNewCarro());
})

carrito.delete('/:id', (req, res) => {
    console.log("delete request recibido");
    let id = req.params;
    carrosFile.deleteCarro(id.id);
    res.send('carro borrado');
})

carrito.get('/:id/productos', (req, res) => {
    let id = req.params;
    res.send(carrosFile.getCarro(id.id));
})

carrito.post('/:id/productos', (req, res) => {
    console.log("post request recibido");
    let id = req.params;
    res.send(carrosFile.saveProducts(id.id));
})

carrito.delete('/:id/productos/:id_prod', (req, res) => {
    console.log("delete request recibido");
    let id = req.params.id;
    let id_prod = req.params.id_prod;
    res.send(carrosFile.deleteProductFrom(id, id_prod));
})

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
            carros.push(newCarro);
            fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(carros));
            return(newCarro.id)
        } else {
            fileCarros = JSON.parse(fileCarros);
            let lastCarro = fileCarros[fileCarros.length - 1];
            let idLastCarro = lastCarro.id;
            let newCarro = {id: `${parseInt(idLastCarro) + 1}`, timestamp: `${today}`, productos: " "}
            fileCarros.push(newCarro);
            fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(fileCarros));
            return(`id del nuevo carro: ${newCarro.id}`)
        }
    }

    deleteCarro(numeroID) {
        let file = fs.readFileSync(`./dataBase/carritos.json`, 'utf-8');
        file = JSON.parse(file);
        file = file.filter(obj => obj.id !== numeroID)
        fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(file));
        return(`producto eliminado con exito`);
    }  

    getCarro(numero){
        
        let file = fs.readFileSync(`./dataBase/carritos.json`, 'utf-8');
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
            let noEncontrado = {error: 'producto no encontrado'}
            return(noEncontrado)
        } else {
            return(elegido.productos)
        }
    }

    saveProducts(idCarrito) {
        let fileProductos = fs.readFileSync('./dataBase/productos.json', 'utf-8');
        let fileCarros = fs.readFileSync('./dataBase/carritos.json', 'utf-8');
        fileCarros = JSON.parse(fileCarros);
        fileProductos = JSON.parse(fileProductos);

        fileCarros.forEach(carrito => {
            if (carrito.id === parseInt(idCarrito)){
                carrito.productos = fileProductos;
            }
        });

        fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(fileCarros));
        return (`productos agregados con exito al carrito ${idCarrito}`)
    }

    deleteProductFrom(idCarrito, idProducto) {
        let fileCarros = fs.readFileSync('./dataBase/carritos.json', 'utf-8');
        fileCarros = JSON.parse(fileCarros);
        let res = "";

        fileCarros.forEach(carrito => {
            if (carrito.id === parseInt(idCarrito)){
                carrito.productos = carrito.productos.filter(prod => prod.id !== parseInt(idProducto));
                res = "producto borrado con exito";
            } else {
                res = "este id no pertenece a un carrito"
            }
            fs.writeFileSync('./dataBase/carritos.json', JSON.stringify(fileCarros));
            
        });
        return(res);
    }

    
}

let carrosFile = new ContenedorCarros("carros");

module.exports = carrito;