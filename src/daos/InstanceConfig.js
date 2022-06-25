import { MongoDbProductos } from "./productos/MongoDbProductos.js";
import { MongoDbCarritos } from './carritos/MongoDbCarritos.js';
import dotenv from 'dotenv'

dotenv.config();

export let productosDao = function(){
    switch(process.env.DB_MONGO_NAME){
        case 'mongoDB':
            return new MongoDbProductos();
        default:
            console.log('Esta base de datos no existe para este proyecto')
            break;
    }
}

export let carritosDao = function(){
    switch(process.env.DB_MONGO_NAME){
        case 'mongoDB':
            return new MongoDbCarritos();
        default:
            console.log('Esta base de datos no existe para este proyecto')
            break;
    }
}
