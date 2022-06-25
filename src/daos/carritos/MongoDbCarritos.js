import MongoClass from "../../contenedores/ContenedorMongoDb.js";

export class MongoDbCarritos extends MongoClass{
    constructor(){
        super('carritos', {
            products: {type: Array, default:[]},
        })
    }
}