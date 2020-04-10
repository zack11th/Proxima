module.exports.recalc_electricity = function(Aurora){

  let PowerProduction=0;
  let PowerConsumption=0;

  //console.log(Aurora);
  Aurora.SubSystems.forEach(function(item,i,arr) {
    if (item.State === true){PowerConsumption = PowerConsumption + item.PowerCons}
  });

  let K =Math.log(Aurora.Reactor.Temp/300)/2.1; //нелинейная характеристика работы ячеек. При Т=2400 выдает 1 кВт

  for (let i = 0; i < 1600; i++) {
    if (Aurora.Power.PowerCells[i]===true&&K>0){PowerProduction = PowerProduction+1000*K}
   }

  Aurora.Power.PowerProduction = PowerProduction;
  Aurora.Power.PowerConsumption = PowerConsumption;
  // console.log(PowerProduction);

};

module.exports.recalc_ReactorTemp = function(Aurora){
    let Avg = 0;
    let Ttl = 0;
    let TargetTemp = 0;
    let num=0;
    let CoolEff=10;
    for (let r = 0; r < 6; r++) {
        if(Aurora.Reactor.ControlRods[r].State){
          Ttl = Ttl+Aurora.Reactor.ControlRods[r].Position*Aurora.Reactor.ControlRods[r].Position;
          num=num+1;
        }
    };
    Avg = 1 - Ttl/num/10000;
    TargetTemp = Math.round(Avg * 2800+400+GaussRandom(-20,20));
    if (Aurora.Reactor.Temp<TargetTemp){
        Aurora.Reactor.Temp = Aurora.Reactor.Temp+GaussRandom(0,5);
    }else{
        Aurora.Reactor.Temp = Aurora.Reactor.Temp-GaussRandom(0,CoolEff);
    }
    Aurora.Reactor.TargetTemp = TargetTemp;
    if( Aurora.Reactor.Temp>1400){
      testTEG(Aurora);
    }

    //console.clear();
    // console.log(num);
    //console.log(TargetTemp);
    // console.log(Aurora.Reactor.Temp);
    // console.log(Aurora.Reactor.ControlRods);
};

module.exports.recalc_heat = function(Aurora) {

};

let testTEG = function(Aurora){
  Aurora.Power.Ticker++;
  if (Aurora.Power.Ticker==20){
      // console.log("tick!");
      for(let i=Math.round(getRandom(0,1599)); i<1600;i++){

          if(!Aurora.Power.PowerCells[i]){continue}
          let DiceRoll=0;
          while(DiceRoll<100){DiceRoll=GaussRandom(0,200)}
          DiceRoll=DiceRoll-100;
          let DeltaTemp=Aurora.Reactor.Temp-1400;
          // console.log(DiceRoll*DeltaTemp);
          if(DiceRoll*DeltaTemp>1000){
              Aurora.Power.PowerCells[i]=false;
              break;
          }
      }
      Aurora.Power.Ticker=0;
  }
};

function notBroken(Aurora) {
  let working = [];
  let start = 0;
  let current = Aurora.Power.PowerCells.indexOf(true, start);

  while(current !== -1) {
    working.push(current);
    start = current + 1;
    current = Aurora.Power.PowerCells.indexOf(true, start);
  }
  return working;
}

module.exports.breakTEG = function(Aurora,percent) {

  let num = 1600*percent/100;
  let broken = 0;

  let working = notBroken(Aurora);

  if(num > working.length) {
    Aurora.Power.PowerCells.forEach((item, i) => {
      Aurora.Power.PowerCells[i] = false;
    });
    return false;
  }

  while (broken<num){
    let index = Math.round(Math.random()*working.length);
    if (Aurora.Power.PowerCells[working[index]]){
        Aurora.Power.PowerCells[working[index]]=false;
        broken++;
    }
  }

};

module.exports.recoverTEG = function(Aurora,value) {
  let cnt = value;
  while(cnt !== 0) {
    let i = Aurora.Power.PowerCells.indexOf(false);
    if(i === -1) return false;
    Aurora.Power.PowerCells[i] = true;
    cnt--;
  }
};

GaussRandom = function(min, max){
    return (Math.random()+Math.random()+Math.random()+Math.random()+Math.random())*(max-min)/5  +min;
};

getRandom = function(min, max) {
    return Math.random() * (max - min) + min;
};