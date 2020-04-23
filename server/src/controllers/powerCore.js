module.exports.recalc_electricity = function(Aurora){

  let PowerProduction=0;
  let PowerConsumption=0;
  let PowerTEG=0;

  //console.log(Aurora);
  Aurora.SubSystems.forEach(function(item,i,arr) {
    if (item.State === true){PowerConsumption = PowerConsumption + item.PowerCons}
  });

  let K =Math.log(Aurora.Reactor.Temp/300)/2.1; //нелинейная характеристика работы ячеек. При Т=2400 выдает 1 кВт

  for (let i = 0; i < 1600; i++) {
    if (Aurora.Power.PowerCells[i]===true&&K>0){PowerTEG = PowerTEG+1000*K}
   }
  PowerProduction = PowerProduction+PowerTEG;

  Aurora.Power.PowerTEG = PowerTEG;
  Aurora.Power.PowerProduction = PowerProduction;
  Aurora.Power.PowerConsumption = PowerConsumption;
  recalc_batteries(Aurora);
};

module.exports.recalc_ReactorTemp = function(Aurora){
    let Avg = 0;
    let Ttl = 0;
    let TgtAvg = 0;
    // let TgtTtl = 0;
    // let TargetTemp = 0;
    let num=0;
    let CoolEff=10;

    for (let r = 0; r < 6; r++) {
        if(Aurora.Reactor.ControlRods[r].Position>Aurora.Reactor.ControlRods[r].TargetPosition){Aurora.Reactor.ControlRods[r].Position=Aurora.Reactor.ControlRods[r].Position-0.5}
        if(Aurora.Reactor.ControlRods[r].Position<Aurora.Reactor.ControlRods[r].TargetPosition){Aurora.Reactor.ControlRods[r].Position=Aurora.Reactor.ControlRods[r].Position+0.5}
        // console.log()
        if(Aurora.Reactor.ControlRods[r].State){
          // Ttl = Ttl+Aurora.Reactor.ControlRods[r].Position*Aurora.Reactor.ControlRods[r].Position;
          Ttl = Ttl+Aurora.Reactor.ControlRods[r].TargetPosition*Aurora.Reactor.ControlRods[r].TargetPosition;
          num=num+1;
        }
    }
    Avg = 1 - Ttl/num/10000;
    TargetTemp = Math.round(Avg * 2800+400+GaussRandom(-20,20));
    if (Aurora.Reactor.Temp<TargetTemp){
        Aurora.Reactor.Temp = Aurora.Reactor.Temp+GaussRandom(0,5);
    }else{
        Aurora.Reactor.Temp = Aurora.Reactor.Temp-GaussRandom(0,CoolEff);
    }
    Aurora.Reactor.TargetTemp = TargetTemp;
    if(Aurora.Reactor.Temp>1400||Aurora.Reactor.Mode===0){
      testTEG(Aurora);
    }
};

module.exports.recalc_heat = function(Aurora) {

};

testTEG = function(Aurora){
  Aurora.Power.Ticker++;
  if (Aurora.Power.Ticker===40){
      // console.log("tick!");
      for(i=Math.round(getRandom(0,1599)); i<1600;i++){

          if(!Aurora.Power.PowerCells[i]){continue}
          let DiceRoll=0;
          while(DiceRoll<100){DiceRoll=GaussRandom(0,200)}
          DiceRoll=DiceRoll-100;
          DeltaTemp=Aurora.Reactor.Temp-1400;
          // console.log(DiceRoll*DeltaTemp);
          if(DiceRoll*DeltaTemp>1000){
              Aurora.Power.PowerCells[i]=false;
              break;
          }
      }
      Aurora.Power.Ticker=0;
  }
};

module.exports.breakTEG = function(Aurora,percent) {

  let num = 1600*percent/100;
  let broken = 0;

  while (broken<num){
    index = Math.round(Math.random()*1600);
    if (Aurora.Power.PowerCells[index]){
        Aurora.Power.PowerCells[index]=false;
        broken++;
    }
  }

};

GaussRandom = function(min, max){
    return (Math.random()+Math.random()+Math.random()+Math.random()+Math.random())*(max-min)/5  +min;
};

getRandom = function(min, max) {
    return Math.random() * (max - min) + min;
};

recalc_batteries = function(Aurora){

    let PowerBalance = Aurora.Power.PowerProduction-Aurora.Power.PowerConsumption;
    let BattNumCharge = 0; //Число активных Батарей для зарядки
    let BattNum = 0; //Число активных Батарей
    let ChargePercent = 0;
    let RequiredAmperage = 0;
    let ChargeAmperage = 0;
    let MaxAmperage = 0;

    Aurora.Power.Batteries.forEach(function(item,i,arr) {
        if (item.State === true&&item.ChargeOnly===false){BattNum++}
        if (item.State === true){BattNumCharge++}
    });

    // console.log(Aurora.PowerProduction,Aurora.PowerConsumption);

    if (PowerBalance<0){
        Aurora.Power.Batteries.forEach(function(item,i,arr) {
            // console.log(item.State + " "+ item.ChargeOnly);
            if (item.State === true && item.ChargeOnly===false){
                // console.log(Aurora.Power.Batteries[i].Mode);
                ChargePercent = (item.CurrVoltage-item.MinVoltage)/(item.MaxVoltage-item.MinVoltage);
                // console.log(ChargePercent);
                item.Mode = 2;
                MaxAmperage = item.MaxAmperage*ChargePercent;
                RequiredAmperage = -1*PowerBalance/3600/BattNum/item.CurrVoltage;
                if (RequiredAmperage>MaxAmperage){RequiredAmperage=MaxAmperage}
                RequiredAmperage=RequiredAmperage+GaussRandom(-0.005,0.005);
                item.CurrAmperage = RequiredAmperage;
                Aurora.Power.PowerProduction = Aurora.Power.PowerProduction+RequiredAmperage*3600*item.CurrVoltage;
                // console.log(item.CurrCapacity);
                item.CurrCapacity = item.CurrCapacity - RequiredAmperage*item.CurrVoltage;
                // console.log(item.CurrCapacity);
                item.CurrVoltage = item.CurrCapacity/item.Capacity*(item.MaxVoltage-item.MinVoltage)+item.MinVoltage;
                if(item.CurrVoltage<item.LowVoltage){item.ChargeOnly=true} //
            }
        })}
    else{if (PowerBalance>20){
        Aurora.Power.Batteries.forEach(function(item,i,arr) {
            if (item.State === true){
                ChargePercent = (item.CurrVoltage-item.MinVoltage)/(item.MaxVoltage-item.MinVoltage);
                item.Mode = 1;

                if (ChargePercent>0.9){ChargeAmperage =((1-ChargePercent)*10+GaussRandom(-0.005,0.005))}else{ChargeAmperage=(10+GaussRandom(-0.005,0.005))}
                if (ChargePercent>=1){
                    ChargeAmperage=0;
                    item.Mode = 0;
                }
                // console.log(ChargeAmperage);
                Aurora.Power.PowerConsumption = Aurora.Power.PowerConsumption+ChargeAmperage*3600*item.CurrVoltage;
                item.CurrCapacity = item.CurrCapacity + ChargeAmperage*item.CurrVoltage;
                item.CurrVoltage = item.CurrCapacity/item.Capacity*(item.MaxVoltage-item.MinVoltage)+item.MinVoltage;
                item.CurrAmperage = ChargeAmperage;
        }})}
    }

    // console.log(Aurora.Power.Batteries[0].Mode);
    // console.log(Aurora.Power.Batteries[0].Mode);

};