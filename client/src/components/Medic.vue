<template>
  <div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="0" height="0" style="display: none">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="filter_A">
          <!--<feFlood flood-color="#ce6e00"/>-->
          <!--<feComposite in="SourceGraphic" operator="xor" />-->
          <feColorMatrix type="matrix"
                         values=" 0 0 0 0.81 0
                                  0 0 0 0.43 0
                                  0 0 0 0 0
                                  0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
    <div class="main" ref="main">
      <div  class="person"
            v-for="(item,index) in personal"
            :key="item.id">
        <div class="first">
          <div class="name">
            <img class="profile" :src="`static/${item.img}`" alt="">
            {{ item.name }}
          </div>
          <div class="puls"><img src="../assets/medic/heart.svg" alt=""> <span>{{ item.puls }}</span></div>
          <div class="preassure"><img src="../assets/medic/blood-pressure-gauge.svg" alt=""> <span>{{ item.preassureU }}/{{ item.preassureD }}</span></div>
        </div>
        <div class="middle">
          <div class="progressbar">
            <span class="label">O<sub>2</sub>:</span>
            <div class="bar">
              <div class="progress"></div>
            </div>
            <span>{{ item.oxy }}%</span>
          </div>
          <div class="progressbar">
            <span class="label">H<sub>2</sub>O:</span>
            <div class="bar">
              <div class="progress"></div>
            </div>
            <span>{{ item.water }}%</span>
          </div>
          <div class="progressbar">
            <span class="label"><img src="../assets/medic/nuclear.svg" alt=""></span>
            <div class="bar">
              <div class="progress"></div>
            </div>
            <span>{{ item.nuclear }} рад</span>
          </div>
        </div>
        <div class="button">
          <div class="btn"
               v-if="!activation[index]"
               @click="activeToggle(index)"
          >Активировать</div>
          <div class="btn"
               v-if="activation[index]"
               @click="activeToggle(index)"
          >Принять</div>
          <transition name="code">
            <input type="number" class="code" v-if="activation[index]" v-focus>
          </transition>
        </div>
      </div>
    </div>
    <alert :header="alertMedic.header"
           :message="alertMedic.message"
           :button="alertMedic.button"
           :parent="'alertMedic'"
           v-if="alertMedic.header || alertMedic.message || alertMedic.button"
    ></alert>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Alert from './Other/Alert';

  export default {
    name: "Medic",
    components: {
      Alert
    },
    data: () => ({
      activation: [false, false, false, false, false, false, false, false]
    }),
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    computed: {
      personal() {
        return this.$store.getters.personal;
      },
      alertMedic() {
        return this.$store.getters.alertMedic
      }
    },
    methods: {
      activeToggle(i) {
        Vue.set(this.activation, i, !this.activation[i])
      }
    },
    mounted() {
      document.title = 'Медик';
      this.$socket.emit('conn', 'med');
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-wrap: wrap;
    background-color: #0f00a2;
    min-height: 100vh;
    color: #22c325;
  }
  .person {
    width: 50%;
    box-sizing: border-box;
    border: 2px solid #22c325;
    padding: 10px;
    display: flex;
  }
  .first {
    width: 30%;
  }
  .middle {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .button {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  /* ******** FIRST ********** */
  .profile {
    height: 30px;
    filter: url(#filter_A);
  }
  .name {
    font-size: 2rem;
  }
  .first span {
    font-size: 1.4rem;
  }
  .puls, .preassure {
    height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .puls > img, .preassure > img {
    height: 100%;
    margin-right: 10px;
  }
  /* ********* PROGRESS BAR ****** */
  .progressbar {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-between;
  }
  .progressbar > span {
    width: 25%;
    height: 20px;
    text-align: center;
  }
  .progressbar > .label {
    width: 15%;
  }
  span > img {
    height: 100%;
  }
  .bar {
    width: 70%;
    border: 1px solid #070707;
  }
  /* ************ BUTTON ********** */
  .btn {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid red;
    background-color: rgba(206,110,0,0.5);
    margin: auto 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .code {
    position: absolute;
    width: 200%;
    height: 30px;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
  }
  .code-enter-active {
    animation: bounce-in 0.5s;
  }
  .code-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      width: 0;
    }
    100% {
      width: 200%;
    }
  }
  /* ********** MEDIA ************* */
  @media (max-width: 600px) {
    .person {
      width: 100%;
    }
  }
</style>
