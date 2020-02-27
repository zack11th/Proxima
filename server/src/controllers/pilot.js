const G = 6.67408*Math.pow(10,-11);
const M = 6.4171*Math.pow(10,23);

let orbit = {
    landing: false, // флаг начала приземления Авроры
    scale: 10000,
    center: {
        cx: 0,
        cy: 0
    },
    planets: [
        {
            name: 'Proxima A',
            a: 1500000, // большая полуось
            b: 1500000, // малая полуось
            F: -20, // наклон
            P: 0,
            w: 180, // угол относительно центра (изменяется по интервалу)
            v: 0, // скорость (считает автоматом)
            W_speed: 0, // угловая скорость  (считает автоматом)
            h: 0, // высота  (считает автоматом)
            shift: 0, // смещение (считает автоматом)
            K_speed: 1 // коэффициент для корректировки скорости
        },
        {
            name: 'Proxima B',
            a: 3000000, // большая полуось
            b: 3000000, // малая полуось
            F: -20, // наклон
            P: 0,
            w: 110, // угол относительно центра (изменяется по интервалу)
            v: 0, // скорость (считает автоматом)
            W_speed: 0, // угловая скорость  (считает автоматом)
            h: 0, // высота  (считает автоматом)
            shift: 0, // смещение (считает автоматом)
            K_speed: 1 // коэффициент для корректировки скорости
        },
        {
            name: 'Proxima C',
            a: 5500000, // большая полуось
            b: 5500000, // малая полуось
            F: -20, // наклон
            P: 0,
            w: 240, // угол относительно центра (изменяется по интервалу)
            v: 0, // скорость (считает автоматом)
            W_speed: 0, // угловая скорость  (считает автоматом)
            h: 0, // высота  (считает автоматом)
            shift: 0, // смещение (считает автоматом)
            K_speed: 1 // коэффициент для корректировки скорости
        }
    ],
    ship: {
        name: 'Aurora',
        a: 7300000, // большая полуось
        b: 6000000, // малая полуось
        F: -47, // наклон
        P: 0,
        w: 70, // угол относительно центра (изменяется по интервалу)
        v: 10000, // скорость (устанавливаем)
        W_speed: 0, // угловая скорость  (считает автоматом)
        cxs: 0, // центр орбиты корабля по х
        cys: 1080, // центр орбиты корабля по у
        K_speed: 1, // коэффициент для корректировки скорости
        delta_nuclear: 0 // изменение тяги ядерного двигателя для изменения орбиты корабля
    }
};

let navigator = {
    difficult: 5,
    nuclear: {
        darkMater: false,
        button_1: false,
        button_2: false,
        thrust: 0
    },
    manevr: {
        button_1: false,
        button_2: false,
        thrust: 0
    },
    alarm: {
        speed: false,
        temperature: false
    },
    speedSurface: 0,
    roll: 0,
    rollOptimal: [0, 180],
    temperature: -273,
    heightSurface: 0,
    brakeSystem: false,
    chassis: false
};

function DegToRad(deg) {
    return deg/180*Math.PI;
}

function calcSpeed(items) {
    items.forEach((item, i, arr) => {
        let x = item.a * Math.cos(DegToRad(item.w));
        if(item.shift > 0) {
            item.h = Math.sqrt(Math.pow(Math.abs(x+item.shift),2)+Math.pow(item.b * Math.sin(DegToRad(item.w)),2));
        }else{
            if(x > 0 && Math.abs(x) > item.shift) {
                item.h	= Math.sqrt(Math.pow(x+item.shift,2)+Math.pow(item.b * Math.sin(DegToRad(item.w)),2));
            }else{
                item.h	= Math.sqrt(Math.pow(Math.abs(x)-item.shift,2)+Math.pow(item.b * Math.sin(DegToRad(item.w)),2));
            }
        }
        item.v	= Math.sqrt(G*M/(item.h));
        item.w_speed = (item.v/item.h*180/Math.PI) / item.K_speed;
        item.w -= item.w_speed
    });
}

function calcSpeedShip(ship) {
    ship.w_speed = (ship.v/ship.a*180/Math.PI) / ship.K_speed;
    ship.w -= ship.w_speed;
}

function calcApogeeShip(ship) {
    ship.a += ship.delta_nuclear * 100
}

function pilot(io, socket) {

    socket.on('canvas', (data) => {
        orbit.center.cx = data.width / 2;
        orbit.center.cy = data.height / 2;
        io.to('game').emit('changePlanet', {orbit});
    });

    socket.on('startLarp', () => {
        // вычисление автоматических стартовых параметров
        orbit.planets.forEach((item, i, arr) => {
            item.shift = item.a - item.b
        });
        orbit.ship.cys = orbit.center.cy * 2;

        setInterval(() => {
            calcSpeed(orbit.planets);
            calcSpeedShip(orbit.ship);
            calcApogeeShip(orbit.ship);
            io.emit('changePlanet', {
                orbit,
                navigator
            });
        }, 100);
    });

    socket.on('setPlanet', (data) => {
        orbit = data;
    });

    socket.on('changeNuclearThrust', (data) => {
        orbit.ship.delta_nuclear = data;
        navigator.nuclear.thrust = data;
    });

    socket.on('changeNuclearThrustMaster', (data) => {
        orbit.ship.a += data;
    });

    socket.on('landing', () => {
        orbit.landing = true
    });

    // navigator
    socket.on('setGamepad', (data) => {
        navigator.nuclear.button_1 = !!data.buttons[4];
        navigator.nuclear.button_2 = !!data.buttons[6];
        if(navigator.nuclear.button_1 && navigator.nuclear.button_2){
            navigator.nuclear.thrust = (+data.axes[1] < 0) ? -1 * parseInt(+data.axes[1] * 100) : parseInt(+data.axes[1] * 100);
        } else {
            navigator.nuclear.thrust = 0;
        }
        navigator.manevr.button_1 = !!data.buttons[5];
        navigator.manevr.button_2 = !!data.buttons[7];
        if(navigator.manevr.button_1 && navigator.manevr.button_2) {
            navigator.manevr.thrust = (+data.axes[3] < 0) ? 0 : parseInt(+data.axes[3] * 100);
        } else {
            navigator.manevr.thrust = 0;
        }
    });
}

module.exports = pilot;