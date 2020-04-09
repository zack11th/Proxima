module.exports.recalc_electricity = function(Aurora){

  PowerProduction=0;
  PowerConsumption=0;

  //console.log(Aurora);
  Aurora.SubSystems.forEach(function(item,i,arr) {
    if (item.State == true){PowerConsumption = PowerConsumption + item.PowerCons};
  });

  let K =Math.log(Aurora.Reactor.Temp/300)/2.1; //нелинейная характеристика работы ячеек. При Т=2400 выдает 1 кВт

  for (let i = 0; i < 1600; i++) {
    if (Aurora.Power.PowerCells[i]===true&&K>0){PowerProduction = PowerProduction+1000*K}
   }

  Aurora.Power.PowerProduction = PowerProduction;
  Aurora.Power.PowerConsumption = PowerConsumption;
  // console.log(PowerProduction);

};

module.exports.recalc_heat = function(time_scale) {

};

