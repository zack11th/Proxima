function gamepad(io, socket) {
    socket.on('setGamepad', (data) => {
        io.emit('changeGamepad', data);
    });
}

module.exports = gamepad;