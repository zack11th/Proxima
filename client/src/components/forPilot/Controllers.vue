<template>
    <div class="controllers">
      <div class="top">
        <div class="flex-col first-col">
          <div class="item"><span>Давление гидравлики (правый борт):</span> <span>{{noise.c}}МПа</span></div>
          <div class="item"><span>Температура гидравлической жидкости (правый борт):</span> <span> {{noise.d}}&deg C</span></div>
          <div class="item"><span>Давление гидравлики (левый борт):</span> <span> {{noise.e}}МПа</span></div>
          <div class="item"><span>Температура гидравлической жидкости (левый борт):</span> <span> {{noise.f}}&deg C</span></div>
          <div class="item"><span>Давление гидравлики (резервное):</span> <span> {{noise.g}}МПа</span></div>
          <div class="item"><span>Температура гидравлической жидкости (резервное):</span> <span> {{noise.h}}&deg C</span></div>
          <div class="item"><span>Высота над условным уровнем моря:</span> <span> {{noise.y}}м</span></div>
          <div class="item"><span>Высота над поверхностью:</span> <span> {{Math.round(navigator.heightSurface) || '--'}}м</span></div>
        </div>
        <div class="flex-col other-col">
          <div class="item">Температура внешней обшивки: {{Math.round(navigator.temperature)}}&deg C</div>
          <div class="item">Температура внутреннего корпуса: {{Math.floor(noise.b)}}&deg C</div>
          <div class="item">Температура сопла 1-2: {{Math.floor(noise.aa)}}&deg C</div>
          <div class="item">Температура сопла 3-4: {{Math.floor(noise.bb)}}&deg C</div>
          <div class="item">Температура сопла 5-6: {{Math.floor(noise.cc)}}&deg C</div>
          <div class="item">Температура сопла 7-8: {{Math.floor(noise.dd)}}&deg C</div>
        </div>
        <div class="flex-col">
          <div class="item">Плотность атмосферы: {{Math.floor(noise.q)}}кПа</div>
          <div class="item">Давление наддува Бак 1: {{noise.r}}</div>
          <div class="item">Давление наддува Бак 2: {{noise.s}}</div>
          <div class="item">Давление наддува Бак 3: {{noise.t}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="flex-col down-col">
          <div class="item">Обороты гиродина: {{noise.l}}</div>
          <div class="item">Давление в системе точного маневрирования (правый борт): {{noise.j}}МПа</div>
          <div class="item">Давление в системе точного маневрирования (левый борт): {{noise.k}}МПа</div>
          <div class="item">Состояние заслонки сопла: {{noise.i}}</div>
        </div>
        <div class="flex-col">
          <div class="item">Ускорение продольное: {{noise.u}} g</div>
          <div class="item">Ускорение поперечное: {{noise.v}} g</div>
          <div class="item">Ускорение вертикальное: {{noise.w}} g</div>
          <div class="item">Модуль ускорения: {{(Math.round(navigator.acceleration*10))/10 || '--'}} м/с^2</div>
        </div>
      </div>
      <div class="time">
        Продолжительность миссии: 10 лет 0 д. {{timeMission.h}} : {{timeMission.m}} : {{timeMission.s}}
      </div>
    </div>
</template>

<script>
  let log = console.log;

    export default {
      name: "Controllers",
      data() {
        return {
          noise: {
            b: 20,
            c: 9.1,
            d: 63,
            e: 9.3,
            f: 68,
            g: 9.1,
            h: 64,
            i: 'открыто',
            j: 8.1,
            k: 7.9,
            l: 0,
            q: 0,
            r: 10.1,
            s: 12.5,
            t: 11.3,
            u: 0,
            v: 0,
            w: 0,
            y: '--',
            aa: -270,
            bb: -270,
            cc: -270,
            dd: -270
          }
        };
      },
      computed: {
        navigator() {
          return this.$store.getters.get_navigator;
        },
        timeMission() {
          return this.$store.getters.getTimeMission;
        }
      },
      methods: {
        getRandom(min, max) {
          return Math.random() * (max - min) + min;
        },
        GaussRandom(min, max) {
          return (Math.random()+Math.random()+Math.random()+Math.random()+Math.random())*(max-min)/5  +min;
        },
        changeControllers(items) {
          if (this.navigator.temperature > items.b &&  items.b < 110) items.b += Math.random() * ((110-items.b)/50);
          if (this.navigator.temperature < items.b &&  items.b > 0) items.b -= Math.random() * ((110-items.b)/50);
          if (this.navigator.stage === 4 && items.b < 20 ) items.b += 0.1;

          items.c = Math.floor(this.GaussRandom(8, 16)*10)/10;
          items.d = Math.floor(this.GaussRandom(60, 120));
          items.e = Math.floor(this.GaussRandom(8, 16)*10)/10;
          items.f = Math.floor(this.GaussRandom(60, 120));
          items.g = Math.floor(this.GaussRandom(9, 11)*10)/10;
          items.h = Math.floor(this.GaussRandom(65, 75));

          items.j = Math.floor(this.GaussRandom(6, 10)*10)/10;
          items.k = Math.floor(this.GaussRandom(6, 10)*10)/10;
          items.l = Math.floor(this.GaussRandom(10000, 12000));

          if(this.navigator.stage === 1 || this.navigator.stage === 2) items.q += 0.06;
          if(this.navigator.stage === 3) items.q -= 0.07;

          items.r = Math.floor(this.GaussRandom(6, 18)*10)/10;
          items.s = Math.floor(this.GaussRandom(6, 18)*10)/10;
          items.t = Math.floor(this.GaussRandom(6, 18)*10)/10;
          items.u = Math.floor(this.navigator.acceleration + this.GaussRandom(-0.3, 0.3)*100)/100;
          items.v = Math.floor(this.GaussRandom(-0.2, 0.2)*100)/100;
          items.w = Math.floor(this.GaussRandom(-0.5, 0.5)*100)/100;

          log(this.navigator)

          items.y = Math.floor(this.navigator.heightSurface + 1173 + this.GaussRandom(-750, 750));

          if (this.navigator.stage !== 3) {
            items.aa += this.GaussRandom(0.6, 0.9);
            items.bb += this.GaussRandom(0.6, 0.9);
          }else {
            items.aa -= this.GaussRandom(0.6, 0.9);
            items.bb -= this.GaussRandom(0.6, 0.9);
          }

          if (this.navigator.temperature < 0){
            items.cc = this.navigator.temperature + this.GaussRandom(-3, 3);
            items.dd = this.navigator.temperature + this.GaussRandom(-3, 3);
          }else {
            items.cc = this.navigator.temperature /2 + this.GaussRandom(-10, 10);
            items.dd = this.navigator.temperature /2 + this.GaussRandom(-10, 10);
          }
          this.$socket.emit('changeNoise', this.noise)
        },
        setControllers(items) {
          items.l = 0;
          items.u = 0;
          items.v = 0;
          items.w = 0;
          items.aa = this.navigator.temperature + this.getRandom(-10, 100);
          items.bb = this.navigator.temperature + this.getRandom(-10, 100);
          items.cc = this.navigator.temperature + this.getRandom(-10, 10);
          items.dd = this.navigator.temperature + this.getRandom(-10, 10);
          if (this.navigator.heightSurface === '--') items.y = '--';
          this.$socket.emit('changeNoise', this.noise)
        }
      },
      mounted() {
        document.addEventListener('startLanding', () => {
          let interv = setInterval(() => {
            if(this.navigator.stage > 3) {
              clearInterval(interv);
              this.setControllers(this.noise);
              return false;
            }
            this.changeControllers(this.noise);
          }, 100);
        });
        document.addEventListener('liftOff', () => {
          let interv = setInterval(() => {
            if(this.navigator.heightSurface === '--') {
              clearInterval(interv);
              this.setControllers(this.noise);
              return false;
            }
            this.changeControllers(this.noise);
          }, 100);
        });
      }
    }
</script>

<style scoped>
  .controllers {
    width: 100vw;
    height: 100vh;
    position: relative;
    color: #22c325;
  }
  .time {
    width: 850px;
    height: 110px;
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    padding: 10px;
    font-size: 2.5rem;
  }
  .top {
    width: 50%;
    height: 400px;
    display: flex;
    padding: 15px;
  }
  .bottom {
    box-sizing: border-box;
    position: absolute;
    left: 25%;
    bottom: 0;
    width: 40%;
    height: 250px;
    display: flex;
    padding: 10px;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .bottom .flex-col {
    justify-content: flex-end;
  }
  .first-col {
    width: 45%;
  }
  .other-col {
    width: 30%;
  }
  .down-col {
    width: 70%;
  }
  .item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
</style>
