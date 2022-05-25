const socket = io();


//---------------------------CHAT

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
                    <b class="email">${elem.author}</b>
                    <em class="horario">${elem.time}</em>
                    <em class="mensaje">${elem.text}</em>
                    
                </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data){
    render(data);
});

let tiempo = "";

function addMessage(e) {
    getTimeStamp()
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        time: tiempo
    };
    console.log(tiempo);
    socket.emit('new-message', mensaje);
    return false;
}

function getTimeStamp(){
    const d = new Date();
    tiempo = `[${d.getDate()}/${(d.getMonth()+ 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getMilliseconds()}]`;
}

//---------------------------FORMULARIO DE PRODUCTOS

function renderProduct(data) {
    

    if (data.length === 0){
        document.getElementById('listado').innerHTML = `<p>no hay productos</p>`;
    } else {

        document.getElementById('listado').innerHTML = `<thead id="thead">
                                                            <tr style="margin: 5px;">
                                                                <th>productos agregados</th>
                                                                <th>precio</th>
                                                                <th>miniatura</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="tbody">
                                                        </tbody>`;

        const productDiv = data.map((elem, index) => {
        return(`
                <tr style="margin: 5px;">
                    <td style="margin-right: 5px;">${elem.title}</td>
                    <td style="margin-right: 5px;">${elem.price}</td>
                    <td>
                        <img src="${elem.imgURL}" style="height: 30px; width: auto"/>
                    </td>
                </tr>
                `)
        })

        document.getElementById('tbody').innerHTML = productDiv;
    }

}

socket.on('listado', function(data){
    renderProduct(data);
});

function addProduct(e) {
    const newProducto = {
        title: document.getElementById('nombreProducto').value,
        price: document.getElementById('precio').value,
        imgURL: document.getElementById('imgURL').value
    };
    socket.emit('new-product', newProducto);
    return false;
}