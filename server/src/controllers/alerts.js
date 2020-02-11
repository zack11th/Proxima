function alerts(io, socket) {

    socket.on('alertPilot', data => {
        io.emit('pilotAlert', data);
    })
}

module.exports = alerts;