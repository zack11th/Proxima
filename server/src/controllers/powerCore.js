let PowerCore = {
      Capacity: 1000000,
      PowerProduction: 0,
      PowerCons: 0,
      TEG: [0],
      SolarBatt:{
        Online: false,
        PowerProduction: 6000
      }
    };

let ThermalCore={
      Radiator: {
        Online: false,
        Eff: 1000
      },
      PowerCons: 100,
      Temp: 0
    };

module.exports.recalc_electricity = function(Aurora){

  PowerProduction=0;
  PowerConsumption=0;

  //console.log(Aurora);
  Aurora.SubSystems.forEach(function(item,i,arr) {
    PowerConsumption = PowerConsumption + item.PowerCons;
  });

  Aurora.PowerProduction = PowerProduction;
  Aurora.PowerConsumption = PowerConsumption;

};

module.exports.recalc_heat = function(time_scale) {
};

