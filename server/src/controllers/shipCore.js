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
        this.TargetPosition = 80;
    }
}

class Batterie {
    constructor(State,Cap) {
        this.State = State;
        this.Capacity = Cap;
        this.Mode = 0; //0 - поддержание, 1 - заряд, 2 - разряд
        this.MaxVoltage = 50.4;
        this.LowVoltage = 33.6;
        this.MinVoltage = 30;
        this.CurrCapacity = Cap;
        this.CurrVoltage = 50.4;
        this.CurrAmperage = 0;
        this.MaxAmperage = 100;
        this.ChargeOnly = false;
    }
}


ship = new Object();

global.Aurora = ship;

module.exports.init_ship = function(){
    Aurora.SubSystems = [];
    Aurora.SubSystems.push(new SubSystem(0,true,"Базовые системы",1000));
    Aurora.SubSystems.push(new SubSystem(1,true,"Освещение",500));
    Aurora.SubSystems.push(new SubSystem(2,true,"Вычислительный блок ИИ",5000));
    Aurora.SubSystems.push(new SubSystem(3,true,"Магнитная ловушка ТМ",120000));
    Aurora.SubSystems.push(new SubSystem(4,true,"Фокусирующий магнит",400000));
    Aurora.SubSystems.push(new SubSystem(5,true,"Климат-контроль кают",12000));
    Aurora.SubSystems.push(new SubSystem(6,true,"Система генерации топлива - контур 1",150000));
    Aurora.SubSystems.push(new SubSystem(7,true,"Система генерации топлива - контур 2",150000));
    Aurora.SubSystems.push(new SubSystem(8,true,"Система генерации топлива - контур 3",150000));
    Aurora.SubSystems.push(new SubSystem(9,true,"Система генерации топлива - контур 4",150000));
    Aurora.SubSystems.push(new SubSystem(10,true,"Регенерация воздуха",30000));
    Aurora.SubSystems.push(new SubSystem(11,true,"Система вентиляции",4000));
    Aurora.SubSystems.push(new SubSystem(12,true,"Рециркуляция воды",8000));
    Aurora.SubSystems.push(new SubSystem(13,true,"Вспомогательные системы ЖО",6000));
    Aurora.SubSystems.push(new SubSystem(14,true,"Электромагнитное экранирование",80000));
    Aurora.SubSystems.push(new SubSystem(15,true,"Прочие потребители",6000));
    Aurora.SubSystems.push(new SubSystem(16,true,"Авионика",12000));
    Aurora.SubSystems.push(new SubSystem(17,true,"Гиродин",28000));
    Aurora.SubSystems.push(new SubSystem(18,true,"Подогрев топливных магистралей",20000));

    Aurora.Reactor = {
        Mode: 0, //Режимы реактора: 0 - ХХ, 1- Ядерная тяга, 2 - заглушен
        Temp : 1000,
        TargetTemp : 1000,
        ControlRods:[]
    };

    for (let r = 0; r < 6; r++) {
        Aurora.Reactor.ControlRods.push(new ControlRod);
    }

    Aurora.Power = {
        PowerCells : [],
        Batteries: [],
        PowerConsumption:0,
        PowerProduction:0,
        PowerTEG:0,
        Ticker:0
    };

    for (let i = 0; i < 1600; i++) {
        Aurora.Power.PowerCells[i]=true;
    }

    Aurora.Power.Batteries.push(new Batterie(true,Math.round(1200000*GaussRandom(0.7,0.9)*100000)/100000));
    Aurora.Power.Batteries.push(new Batterie(false,Math.round(1200000*GaussRandom(0.7,0.9)*100000)/100000));
    Aurora.Power.Batteries.push(new Batterie(true,Math.round(1200000*GaussRandom(0.7,0.9)*100000)/100000));
    Aurora.Power.Batteries.push(new Batterie(true,Math.round(1200000*GaussRandom(0.7,0.9)*100000)/100000));
    Aurora.Power.Batteries.push(new Batterie(true,Math.round(1200000*GaussRandom(0.7,0.9)*100000)/100000));
    Aurora.Power.Batteries.push(new Batterie(true,Math.round(1200000*GaussRandom(0.7,0.9)*100000)/100000));


    console.log(`Aurora system online`);
};

module.exports.recalc_state = function(){
    powerCore.recalc_electricity(Aurora);
    powerCore.recalc_ReactorTemp(Aurora);
};

module.exports.breakTEG = function(percent){
    powerCore.breakTEG(Aurora,percent);
};

GaussRandom = function(min, max){
    return (Math.random()+Math.random()+Math.random()+Math.random()+Math.random())*(max-min)/5  +min;
};
