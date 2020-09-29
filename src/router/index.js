import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(Router)

export default new Router({
  routes: [
    
    
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})

