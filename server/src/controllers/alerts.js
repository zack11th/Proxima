function alerts(io, socket) {

    socket.on('alert', data => {
        io.emit(data.event, data.alert);
    });

    socket.on('startLarp', () => {
        alert = {
            header: 'Внимание!',
            message: 'Автоматические системы прокладки курса отключены. Зафиксирована аномалия: черная дыра. Вероятность столкновения в автоматическом режиме 100%. Необходимо проложить курс в ручном режиме. Активируйте ручное управление ядерным двигателем.',
            button: true,
            inProcess: true
        };
        io.emit('alertPilot', alert);
        io.emit('alertCommand', alert);
        io.emit('alertGeneral', alert);
    });


}

module.exports = alerts;