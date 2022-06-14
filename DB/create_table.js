const {options} = require('./configDB.js')
const knex = require('knex')(options);

//creo la tabla(schema) "cars'  con la funcion de knex (createTable) con 3 variables:
knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('name')
    table.integer('price')
    table.string('imgURL')
})
    .then(() => console.log('tabla creada'))
    .catch((err) => {console.log(err); throw err})
    .finally(()=> {
        knex.destroy();
    })