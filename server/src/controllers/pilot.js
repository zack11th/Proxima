let planet = {
    angle: Math.PI / 2.4,
    center: {
        x: 0,
        y: 0
    },
    orbitRadius: 170,
    radius: 10,
    orbitSpeed: 0.01
};

function pilot(io, socket) {

    socket.on('canvas', (data) => {
        planet.center.x = data.width/2-50;
        planet.center.y = data.height/2-150;
        io.to('game').emit('changePlanet', {planet});
    });

    socket.on('startLarp', () => {
        setInterval(() => {
            if (planet.angle > 0) {
                planet.angle -= planet.orbitSpeed
            } else {
                planet.angle = Math.PI * 2;
            }
            io.to('game').emit('changePlanet', {
                planet
            });
        }, 100);
    });

    socket.on('setPlanet', (data) => {
        planet = data;
    });
}

module.exports = pilot;