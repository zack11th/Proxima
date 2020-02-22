function alerts(io, socket) {

    socket.on('alert', data => {
        io.emit(data.event, data.alert);
    })
}

module.exports = alerts;