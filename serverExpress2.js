// configuracion del server ------------------------------------------------------------------------------
const express = require('express');
const { param } = require('express/lib/request');
const { json } = require('express/lib/response');

const { Router } = express;

const app = express()
const router = Router()

//app.use('/api', router);
app.use('/api', router, express.static(__dirname + '/public'));
router.use(express.json());
router.use(express.urlencoded({ extended: true}));


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))

//operaciones de la API ------------------------------------------------------------------------------

router.get('/productos', (req, res) => {
    res.send(archivo.theArray());
})

router.get('/productos/:id', (req, res) => {
    let id = req.params;
    res.send(archivo.getById(id.id));
})

router.post('/productos', (req, res) => {
    console.log("post request recibido");
    console.log(req.body)
    let prodRecibido = req.body;
    archivo.save(prodRecibido);
    res.send('producto enviado');
    
})

router.put('/productos/:id', (req, res) => {
    console.log("put request recibido");
    let id = req.params;
    let prodRecibido = req.body;
    archivo.modificar(id.id, prodRecibido);
    res.send('producto actualizado');
    
})

router.delete('/productos/:id', (req, res) => {
    console.log("delete request recibido");
    let id = req.params;
    archivo.deleteById(id.id);
    res.send('producto borrado');
    
})

//logica ------------------------------------------------------------------------------

let memoria = [];


class Contenedor {
    constructor(data){
        this.data = data;
    }

    theArray(){
        return memoria;
    }

    getById(numero){
        //recibe un numero de id, y devuelve el objeto con ese id o null si no esta
        
        numero = parseInt(numero);
        let existe = null;
        let elegido = "";
        memoria.forEach(element => {
            if (element.id === numero){
                existe = true;
                elegido = memoria.find( x => x.id === numero);
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

        if (memoria.length === 0) {
            objeto[id] = 1;
            memoria.push(objeto);

            return("objeto agregado con exito")
        } else {
            
            let index = memoria.findIndex(object => object.title === objeto.title);
            if (index === -1){
                let ultimo = memoria.length - 1;
                console.log(memoria[ultimo].id);
                objeto[id] = memoria[ultimo].id + 1;
                memoria.push(objeto);
                return("objeto agregado con exito")
            } else {
                console.log(`${objeto.title} ya existe en el array`);
                return(`${objeto.title} ya existe en el array`)
            }
        }
    }
    modificar(numeroID, objetoNew){
        //recibe un numero de id, y devuelve el objeto con ese id o null si no esta
        let id = "id";
        //console.log(numeroID);
        numeroID = parseInt(numeroID);
        let index = memoria.findIndex(prods => {
            return prods.id === numeroID;
        });
        objetoNew[id] = numeroID;
        memoria[index] = objetoNew;
        return("producto modificado con exito");
    }

    deleteById(numeroID) {
        //elimina del archivo el objeto buscado segun el mumero de id
        numeroID = parseInt(numeroID);
        memoria.forEach(element => {
            if (element.id === numeroID){
                let elegido = memoria.findIndex( x => x.id === numeroID);
                let eliminado = memoria.splice(elegido, 1);
                //console.log(`se elimino: ${JSON.stringify(eliminado)}`);
                return(`se elimino: ${JSON.stringify(eliminado)}`);
            }
        });
    }  
}

let archivo = new Contenedor("productos");

