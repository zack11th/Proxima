const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// ******* socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const pilot = require('./controllers/pilot');


// routes import
// const orbit = require('./routes/orbit');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// ***** routes
// app.use('/api/orbit', orbit);
// ***** end routes


io.on('connection', socket => {
    socket.on('conn', data => {console.log(data)});
    socket.join('game'); // создание общего id для всех подключенных клиентов

    pilot(io, socket);
    // socket.on('startLarp', data => {
    //     setTimeout(() => {
    //         console.log(data.text + ' message');
    //         io.to('game').emit('startLarpON', {
    //             text: data.text + ' from SERVER'
    //         });
    //     }, 500)
    // })
});

app.get("*", (req, res) => {
    res.send([{
        title: "Мы еще ничего не создали"
    }]);
});

const port = 3000;
// app.listen(port, () => console.log(`Server has been started on ${port}`));
server.listen(port, () => console.log(`Server has been started on ${port}`));
