const clients = {
    pilot: false,
    nav: false,
    eng_2: false
};

let time = 0;
let timeMission = 4684;

function base(io, socket) {
    socket.on('rebootThat', (target) => {
        io.to(target).emit('reboot');
    });

    socket.on('conn', (data) => {
        clients[data] = true;
        io.to('master').emit('alive', clients);
    });

    socket.on('disconnect', () => {
        clients.pilot = io.sockets.adapter.rooms.hasOwnProperty('pilot');
        clients.nav = io.sockets.adapter.rooms.hasOwnProperty('nav');
        clients.eng_2 = io.sockets.adapter.rooms.hasOwnProperty('eng_2');

        io.to('master').emit('alive', clients);
    });

    socket.on('startLarp', () => {
        setInterval(() => {
            time++;
            timeMission++;
            io.emit('time', {time, timeMission});
        }, 1000);
    });
}

module.exports = base;