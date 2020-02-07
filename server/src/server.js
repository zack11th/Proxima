const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const app = express();
// ******* socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// routes import
const orbit = require('./routes/orbit');

// app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// ***** routes
app.use('/api/orbit', orbit);
// ***** end routes

app.get("*", (req, res) => {
    res.send([{
        title: "Мы еще ничего не создали"
    }]);
});

io.on('connection', socket => {
   console.log('IO connection');
   socket.join('game'); // создание общего id для всех подключенных клиентов

    socket.on('startLarp', data => {
        setTimeout(() => {
            console.log(data.text + ' message');
            io.to('game').emit('startLarpON', {
                text: data.text + ' from SERVER'
            });
        }, 500)
    })
});

const port = 3000;
// app.listen(port, () => console.log(`Server has been started on ${port}`));
server.listen(port, () => console.log(`Server has been started on ${port}`));
