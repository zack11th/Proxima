const shipCore = require('./shipCore');

function shipIO(io, socket, Aurora) {
    setInterval(() => {
        shipCore.recalc_state();

        let Reactor = Aurora.Reactor;
        let Power   =  Aurora.Power;

        io.emit('EmitPower', {
            Reactor,
            Power
        });
    }, 1000);

    socket.on('getPowerData', (data) => {

    });
}

module.exports = shipIO;
