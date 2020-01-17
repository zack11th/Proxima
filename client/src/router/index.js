import Vue from 'vue'
import Router from 'vue-router'
import StartLinks from '@/components/StartLinks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartLinks
    }
  ],
  mode: 'history'
})
