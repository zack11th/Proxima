import Vue from 'vue'
import Router from 'vue-router'
import StartLinks from '@/components/StartLinks'
import Commander from '@/components/Commander'
import Pilot from '@/components/Pilot'
import Medic from '@/components/Medic'
import Scientist from '@/components/Scientist'
import Master from '@/components/Master'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/commander',
      name: 'Commander',
      component: Commander
    },
    {
      path: '/pilot.js',
      name: 'Pilot',
      component: Pilot
    },
    {
      path: '/medic',
      name: 'Medic',
      component: Medic
    },
    {
      path: '/scientist',
      name: 'Scientist',
      component: Scientist
    },
    {
      path: '/master',
      name: 'Master',
      component: Master
    },
    {
      path: '/',
      name: 'Start',
      component: StartLinks
    }
  ],
  mode: 'history'
})
