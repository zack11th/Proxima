const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// ******* socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const pilot = require('./controllers/pilot').pilot;
const alerts = require('./controllers/alerts');
const gamepad = require('./controllers/gamepad');
const base = require('./controllers/base');
const scientist = require('./controllers/scientist');
const medic = require('./controllers/medic').medic;
const medic_recalc = require('./controllers/medic').medic_recalc;
const shipIO = require('./controllers/shipIO');
const shipCore = require('./controllers/shipCore');

const nav = require('./controllers/pilot').nav;


// routes import
// const orbit = require('./routes/orbit');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// ***** routes
// app.use('/api/orbit', orbit);
// ***** end routes


io.on('connection', socket => {
    socket.on('conn', data => {
        socket.join(data);
        console.log(data + ' connection')
    });
    // socket.join('game'); // создание общего id для всех подключенных клиентов

    base(io, socket);
    pilot(io, socket, Aurora);
    alerts(io, socket);
    gamepad(io, socket);
    scientist(io, socket);
    medic(io, socket, Aurora);
    shipIO(io, socket, Aurora);
});

app.get("*", (req, res) => {
    res.send([{
        title: "Мы еще ничего не создали"
    }]);
});

const port = 3010;
// app.listen(port, () => console.log(`Server has been started on ${port}`));
server.listen(port, () => console.log(`Server has been started on ${port}`));

shipCore.init_ship();

setInterval(function () {
    shipCore.recalc_state();
    medic_recalc(io);
},1000);