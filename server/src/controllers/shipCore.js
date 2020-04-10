powerCore = require("./powerCore.js");

class SubSystem{
    constructor(index,state,name,powerCons){
        this.Index = index;
        this.Name  = name;
        this.State = state;
        this.PowerCons = powerCons;
    }
}
class ControlRod {
    constructor() {
        this.State = true;
        this.Position = 80;
    }
}

ship = new Object();

global.Aurora = ship;

module.exports.init_ship = function(){
    Aurora.SubSystems = [];
    Aurora.SubSystems.push(new SubSystem(0,true,"Бортовой компьютер",500));
    Aurora.SubSystems.push(new SubSystem(0,false,"Магнитная ловушка ТМ",120000));
    Aurora.SubSystems.push(new SubSystem(0,false,"Фокусирующий магнит",400000));
    Aurora.SubSystems.push(new SubSystem(0,false,"Климат-контроль кают",12000));
    Aurora.SubSystems.push(new SubSystem(0,false,"Система генерации топлива",200000));

    Aurora.Reactor = {
        Temp : 1400,
        TargetTemp : 1400,
        ControlRods:[]
    };

    for (let r = 0; r < 6; r++) {
        Aurora.Reactor.ControlRods.push(new ControlRod);
    }

    Aurora.Power = {
        PowerCells : [],
        PowerConsumption:0,
        PowerProduction:0,
        Ticker:0
    };

    for (let i = 0; i < 1600; i++) {
        Aurora.Power.PowerCells[i]=true;
    }
    console.log(`Aurora system online`);
};

module.exports.recalc_state = function(){
    powerCore.recalc_electricity(Aurora);
    powerCore.recalc_ReactorTemp(Aurora);
};

module.exports.breakTEG = function(percent){
    powerCore.breakTEG(Aurora,percent);
};
