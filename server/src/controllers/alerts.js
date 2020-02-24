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

    socket.on('landing', () => {
        alert = {
            header: 'Внимание!',
            message: 'Выход на траекторию посадки в автоматическом режиме невозможен. Отключите тягу ядерного двигателя. Активируйте ручное управление маневровыми двигателями.',
            button: false,
            inProcess: true
        };
        io.emit('alertPilot', alert);
    });


}

module.exports = alerts;