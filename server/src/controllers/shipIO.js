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

    socket.on('changeRods', (data) => {
        //console.log(data.ControlRods);
        Aurora.Reactor.ControlRods[0].Position = data.ControlRods.Rod1;
        Aurora.Reactor.ControlRods[1].Position = data.ControlRods.Rod2;
        Aurora.Reactor.ControlRods[2].Position = data.ControlRods.Rod3;
        Aurora.Reactor.ControlRods[3].Position = data.ControlRods.Rod4;
        Aurora.Reactor.ControlRods[4].Position = data.ControlRods.Rod5;
        Aurora.Reactor.ControlRods[5].Position = data.ControlRods.Rod6;
    });
    socket.on('breakTEG', (data) => {
        shipCore.breakTEG(data)
    });
}

module.exports = shipIO;
