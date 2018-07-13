import Vue from 'vue'
import Router from 'vue-router'
import DisplayPage from './display/DisplayPage'
import HomePage from './home/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/display',
      name: 'display',
      component: DisplayPage
    }
  ]
})
