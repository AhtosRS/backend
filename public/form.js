
let titulo = '';
let precio = '';
let imgURL = '';
let objetoForm = {};


class objetosCreados {
    constructor(title, price, thumnail) {
        this.title = title;
        this.price = parseInt(price);
        this.thumnail = thumnail;
    }
}

let form = document.querySelector("form");

form.onsubmit = function crearProducto(e){
    e.preventDefault();

    titulo = document.getElementById("titulo").value
    precio = document.getElementById("precio").value
    imgURL = document.getElementById("urlImg").value

    objetoForm = new objetosCreados(titulo, precio, imgURL);
    
    

    console.log(objetoForm);

    fetch('/api/productos', {
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(objetoForm)
    })
}