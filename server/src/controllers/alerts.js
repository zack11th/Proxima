function alerts(io, socket) {

    socket.on('alert', data => {
        io.emit(data.event, data.alert);
    });

    socket.on('startLarp', () => {
        let alert = {
            header: 'Внимание!',
            message: 'Автоматические системы прокладки курса отключены. Зафиксирована аномалия: черная дыра. Вероятность столкновения в автоматическом режиме 100%. Необходимо проложить курс в ручном режиме. Активируйте ручное управление ядерным двигателем.',
            button: true,
            inProcess: true
        };
        io.emit('alertPilot', alert);
        io.emit('alertCommand', alert);
        io.emit('alertGeneral', alert);

        setTimeout(() => {
            let alertCommand = {
                header: '',
                message: 'Обнаружен сигнал маяка. Координаты внесены в систему маневрирования для высадки.',
                button: true,
                inProcess: true
            };
            io.emit('alertCommand', alertCommand);
        }, 120000)
    });

    socket.on('landing', () => {
        let alert = {
            header: 'Внимание!',
            message: 'Выход на траекторию посадки в автоматическом режиме невозможен. Отключите тягу ядерного двигателя. Активируйте ручное управление маневровыми двигателями.',
            button: false,
            inProcess: true
        };
        let alertCommand = {
            header: 'Внимание!',
            message: 'Убедитесь, что все члены экипажа находятся в креслах и пристегнуты, начинается процедура посадки',
            button: true,
            inProcess: true
        };
        io.emit('alertPilot', alert);
        io.emit('alertCommand', alertCommand);
    });


}

module.exports = alerts;