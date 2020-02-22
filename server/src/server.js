const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// ******* socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const pilot = require('./controllers/pilot');
const alerts = require('./controllers/alerts');
const gamepad = require('./controllers/gamepad');


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
    alerts(io, socket);
    gamepad(io, socket);
});

app.get("*", (req, res) => {
    res.send([{
        title: "Мы еще ничего не создали"
    }]);
});

const port = 3010;
// app.listen(port, () => console.log(`Server has been started on ${port}`));
server.listen(port, () => console.log(`Server has been started on ${port}`));
