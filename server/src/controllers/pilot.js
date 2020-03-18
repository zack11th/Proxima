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
    difficult: 1, // сложность посадки
    nuclear: {
        darkMater: true,
        button_1: false,
        button_2: false,
        thrust: 0 // от 0 до 100
    },
    manevr: {
        button_1: false,
        button_2: false,
        thrust: 0 // от 0 до 100
    },
    alarm: { // подсвечивание не оптимальных параметров
        speed_less: false,
        speed_over: false,
        temperature: false
    },
    speedSurface: 0, // скорость относительно поверхности
    speedSurfaceOptimal: 0, // оптимальная скорость относительно поверхности
    deltaVmin: 0, // нижний порог отклонения скорости до алерта
    deltaVmax: 0, // верхний порог отклонения скорости до алерта
    acceleration: 0, // ускорение при посадке
    accelerationOptimal: [38.1, -44, -61.1, -8.3], // оптимальное ускоренин в зависимости от стадии
    accelerationSystem: [38.1, -60, -110, -10], // системное ускорение, которое будет в случае, если ничего не делать
    roll: 0, // угол крена
    rollOptimal: [0, 180], // оптимальный угол крена
    temperature: -273, // температура обшивки
    heightSurface: '-', // высота
    deltaHeightSurface: [2857, 3556, 389, 83], // скорость изменения высоты в зависимости от стадии посадки в метрах в секунду
    distance: 0, // расстояние до точки посадки в метрах
    brakeSystem: false, // тормозная система
    chassis: false, // выпущенные шасси
    stage: null, // стадия посадки 0 - подлет к планете, 1 - верхние слои атмосферы, 2 - плотные слои атмосферы, 3 - приземление, 4 - сели
    singletoneStage: true, // флаг одноразовых расчетов для стадий
    timeStage: [105, 45, 90, 60], // время каждой стадии в секундах
    wind: {
        inProcess: false,
        deg: 0
    },
    noise: {}
};

let log = console.log;

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

function onChangeStage(n) {
    n.singletoneStage = true;
}

function checkStageLanding(n) {
    switch (n.stage) {
        case 0:
            n.manevr.thrust = 0;
            break;
        case 1:
            if(n.singletoneStage) {
                n.deltaVmin = 270;
                n.deltaVmax = 300;
                n.difficult = 5;
                n.singletoneStage = false;
            }
            break;
        case 2:
            if(n.singletoneStage) {
                n.deltaVmin = 100;
                n.deltaVmax = 154;
                n.singletoneStage = false;
            }
            break;
        case 3:
            if(n.singletoneStage) {
                n.acceleration = -1 * n.speedSurface / n.timeStage[n.stage];
                n.singletoneStage = false;
            }
            break;
        default:
            console.log('unknown stage');
    }
    calcLanding(n);
}

function setWind() {
    log('WETEEEER!')
}

function calcLanding(n) { // вызывается при старте видео посадки каждые 100мс n = navigator
    let oldStage = n.stage;
    if (n.stage !== 3) {
        // ускорение корабля фактическое
        n.acceleration = n.accelerationSystem[n.stage] + Math.abs(n.accelerationSystem[n.stage] / 1.7) * n.manevr.thrust / 100;
    }
    // фактическая скорость корабля
    n.speedSurface = n.speedSurface + n.acceleration / 10;
    // оптимальная скорость корабля
    n.speedSurfaceOptimal = n.speedSurfaceOptimal + n.accelerationOptimal[n.stage] / 10;
    // высота
    n.heightSurface = n.heightSurface - n.deltaHeightSurface[n.stage] / 10;
    // расстояние до места посадки
    n.distance = n.distance - n.speedSurfaceOptimal / 10;
    // температура
    // сложность относительно оптимального угла крена
    // проверка на смену стадии
    if(n.heightSurface < 200000 && n.heightSurface >= 40000) n.stage = 1;
    if(n.heightSurface < 40000 && n.heightSurface >= 5000) n.stage = 2;
    if(n.heightSurface < 5000 && n.heightSurface > 0) n.stage = 3;
    if(n.heightSurface <= 0) n.stage = 4;

    if (oldStage !== n.stage) onChangeStage(n);
    // проверка на оптимум скорости
    n.alarm.speed_less = n.speedSurface < n.speedSurfaceOptimal - n.deltaVmin;
    n.alarm.speed_over = n.speedSurface > n.speedSurfaceOptimal + n.deltaVmax;
    // проверка на превышение температуры
}

function pilot(io, socket) {

    socket.on('canvas', (data) => {
        orbit.center.cx = data.width / 2;
        orbit.center.cy = data.height / 2;
        io.to('game').emit('changePlanet', {orbit, navigator});
    });

    socket.on('startLarp', () => {
        navigator.nuclear.darkMater = false;
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
    socket.on('roll', (data) => {
        navigator.roll = data;
    });
    socket.on('changeNavigator', (data) => {
        navigator = data;
    });

    // ЗАДАНИЕ КНОПОК ОБЩЕГО ГЕЙМПАДА navigator
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

    socket.on('startVideoLanding', () => {
        console.log('******* start VideoLanding *******');
        navigator.stage = 0;
        navigator.speedSurface = 3929;
        navigator.speedSurfaceOptimal = 3929;
        navigator.heightSurface = 500000;
        navigator.distance = 1238512;
        let interval = setInterval(() => {
            if (navigator.stage > 3) {
                clearInterval(interval);
                console.log('******* END VideoLanding *******');
                navigator.heightSurface = 0;
                navigator.speedSurface = 0;
                navigator.distance = 0;
                navigator.acceleration = 0;
                return false;
            }
            checkStageLanding(navigator)
        }, 100);
    });

    socket.on('changeWind', (wind) => {
        navigator.wind.inProcess = wind;
        if(wind) setWind();
    });
}

module.exports = pilot;