const express = require('express')
const { Server: HttpServer} = require('http')
const { Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.use(express.static('./public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index', {root: __dirname})
})

httpServer.listen(3000, () => console.log('Server ON'))

const messages = [
    { author: "Admin", text: "Hola, bienvenido al chat, podes mensajear tranquilo", time: " "}
];

const memoria = [];

io.on('connection', socket => {

    console.log('Usuario conectado')

    //------FORMULARIO DE PRODUCTOS

    socket.emit('listado', memoria)

    socket.on('new-product', data => {
        memoria.push(data);
        io.sockets.emit('listado', memoria);
    });

    //------CHAT
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});


