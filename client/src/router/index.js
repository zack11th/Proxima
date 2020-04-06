import Vue from 'vue'
import Router from 'vue-router'
import StartLinks from '@/components/StartLinks'
import Commander from '@/components/Commander'
import Pilot from '@/components/Pilot'
import Pilot2 from '@/components/Pilot2'
import Medic from '@/components/Medic'
import Scientist from '@/components/Scientist'
import Engineer from '@/components/Engineer'
import Engineer2 from '@/components/Engineer2'
import General from '@/components/General'
import Master from '@/components/Master'
import MasterLanding from '@/components/MasterLanding'
import GamepadTest from '@/components/Other/GamepadTest'
import Rotates from '@/components/Other/Rotates'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/commander',
      name: 'Commander',
      component: Commander
    },
    {
      path: '/pilot',
      name: 'Pilot',
      component: Pilot
    },
    {
      path: '/pilot2',
      name: 'Pilot2',
      component: Pilot2
    },
    {
      path: '/medic',
      name: 'Medic',
      component: Medic
    },
    {
      path: '/scientist/:id',
      props: true,
      name: 'Scientist',
      component: Scientist
    },
    {
      path: '/engineer',
      name: 'Engineer',
      component: Engineer
    },
    {
      path: '/engineer2',
      name: 'Engineer2',
      component: Engineer2
    },
    {
      path: '/general',
      name: 'General',
      component: General
    },
    {
      path: '/gamepad-test',
      name: 'GamepadTest',
      component: GamepadTest
    },
    {
      path: '/rotates',
      name: 'Rotates',
      component: Rotates
    },
    {
      path: '/master',
      name: 'Master',
      component: Master
    },
    {
      path: '/master-landing',
      name: 'MasterLanding',
      component: MasterLanding
    },
    {
      path: '/',
      name: 'Start',
      component: StartLinks
    }
  ],
  mode: 'history'
})
