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
        Aurora.Reactor.ControlRods[0].TargetPosition = data.TargetControlRods.Rod1;
        Aurora.Reactor.ControlRods[1].TargetPosition = data.TargetControlRods.Rod2;
        Aurora.Reactor.ControlRods[2].TargetPosition = data.TargetControlRods.Rod3;
        Aurora.Reactor.ControlRods[3].TargetPosition = data.TargetControlRods.Rod4;
        Aurora.Reactor.ControlRods[4].TargetPosition = data.TargetControlRods.Rod5;
        Aurora.Reactor.ControlRods[5].TargetPosition = data.TargetControlRods.Rod6;
    });
    socket.on('breakTEG', (data) => {
        shipCore.breakTEG(data);
    });
    socket.on('recoverTEG', (data) => {
        shipCore.recoverTEG(data);
    });
    socket.on('auroraBoxMaster', (data) => {
        io.emit('auroraBox', data);
    });
}

module.exports = shipIO;
