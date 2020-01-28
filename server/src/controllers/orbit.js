let planet = {
    angle: Math.PI / 2.4,
    center: {
        x: 0,
        y: 0
    },
    orbitRadius: 170
};

setInterval(() => {
    if (planet.angle > 0) {
        planet.angle -= 0.01 //скорость вращеиня планеты
    } else {
        planet.angle = Math.PI * 2
    }
}, 100);

module.exports.planet = function (req, res) {
    // console.log('запрос')
    try {
        res.status(200).json({
            planet: planet
        })
    }catch(e) {
        console.error('ERROR!!!')
    }
};

module.exports.canvas = function (req, res) {
    try {
        // console.log(req.body);
        planet.center.x = req.body.width/2-50;
        planet.center.y = req.body.height/2-150;
        res.status(200).json({
            planet: planet
        })
    }catch(e) {
        console.error('ERROR!!!')
    }
};