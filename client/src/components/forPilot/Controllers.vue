<template>
    <div class="controllers">
      <div class="top">
        <div class="flex-col first-col">
          <div class="item">Давление гидравлики (правый борт): {{noise.c}}МПа</div>
          <div class="item">Температура гидравлической жидкости (правый борт): {{noise.d}}&deg C</div>
          <div class="item">Давление гидравлики (левый борт): {{noise.e}}МПа</div>
          <div class="item">Температура гидравлической жидкости (левый борт): {{noise.f}}&deg C</div>
          <div class="item">Давление гидравлики (резервное): {{noise.g}}МПа</div>
          <div class="item">Температура гидравлической жидкости (резервное): {{noise.h}}&deg C</div>
          <div class="item">Высота над условным уровнем моря: {{noise.y}}м</div>
          <div class="item">Высота над поверхностью: {{Math.round(navigator.heightSurface)}}м</div>
        </div>
        <div class="flex-col other-col">
          <div class="item">Температура внешней обшивки: {{Math.round(navigator.temperature)}}&deg C</div>
          <div class="item">Температура внутреннего корпуса: {{noise.b}}&deg C</div>
          <div class="item">Температура сопла 1-2: {{noise.aa}}&deg C</div>
          <div class="item">Температура сопла 3-4: {{noise.bb}}&deg C</div>
          <div class="item">Температура сопла 5-6: {{noise.cc}}&deg C</div>
          <div class="item">Температура сопла 7-8: {{noise.dd}}&deg C</div>
        </div>
        <div class="flex-col">
          <div class="item">Плотность атмосферы: {{noise.q}}кПа</div>
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
          <div class="item">Вектор ускорения: {{Math.round(navigator.acceleration) || '--'}} м/с^2</div>
        </div>
      </div>
      <div class="time">
        Продолжительность миссии: 10 лет 0 д. 0 : 0 : 0
      </div>
    </div>
</template>

<script>
    export default {
      name: "Controllers",
      data() {
        return {
          noise: {
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null,
            h: null,
            i: 'открыто',
            j: null,
            k: null,
            l: null,
            q: null,
            r: null,
            s: null,
            t: null,
            u: null,
            v: null,
            w: null,
            y: null,
            aa: null,
            bb: null,
            cc: null,
            dd: null
          }
        };
      },
      computed: {
        navigator() {
          return this.$store.getters.get_navigator;
        }
      }
    }
</script>

<style scoped>
  .controllers {
    width: 100vw;
    height: 100vh;
    position: relative;
    color: #ce6e00;
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
  }
</style>
