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

module.exports.startLARPorbit = function(req, res) {
    setInterval(() => {
        if (planet.angle > 0) {
            planet.angle -= planet.orbitSpeed
        } else {
            planet.angle = Math.PI * 2
        }
    }, 100);
    res.status(200);
    res.end();
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


module.exports.planet = function (req, res) {
    try {
        res.status(200).json({
            planet: planet
        })
    }catch(e) {
        console.error('ERROR!!!')
    }
};


module.exports.set_planet = function (req, res) {
    try {
        planet = req.body;
        res.status(200).json({
            planet: planet
        })
    }catch(e) {
        console.error('ERROR!!!')
    }
};