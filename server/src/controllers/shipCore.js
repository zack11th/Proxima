powerCore = require("./powerCore.js");

class SubSystem{
    constructor(index,state,name,powerCons){
        this.Index = index;
        this.name  = name;
        this.State = state;
        this.PowerCons = powerCons;
    }
}

ship = new Object();

global.Aurora = ship;

module.exports.init_ship = function(){
    Aurora.SubSystems = [];
    Aurora.SubSystems.push(new SubSystem(0,true,"Бортовой компьютер",500));
    Aurora.SubSystems.push(new SubSystem(0,false,"Магнитная ловушка ТМ",120000));
    Aurora.SubSystems.push(new SubSystem(0,false,"Фокусирующий магнит",400000));
    Aurora.SubSystems.push(new SubSystem(0,false,"Климат-контрль кают",12000));
    Aurora.SubSystems.push(new SubSystem(0,false,"Система генерации топлива",200000));

    console.log(`Aurora system online`);
};

module.exports.recalc_state = function(){
    powerCore.recalc_electricity(Aurora);
    console.log('Calculatig power...'+ Aurora.PowerConsumption);
    // console.log('Calculatig power...')
};

module.exports.shipCore = function (io, socket) {
    socket.on('switch', (data) => {
        let test;
        test = data;
    });
};
