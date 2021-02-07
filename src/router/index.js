import Vue from 'vue'
import Router from 'vue-router'
import mainLayout from '../components/layout/main.vue'
import sceneLayout from '../components/layout/sceneLayout.vue'
// import { resolve } from 'core-js/fn/promise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => {
        require(['../views/login'], resolve)
      }
    },
    {
      path: '/mainIndex',
      name: 'mainIndex',
      component: mainLayout,
      children: [{
        path: '/',
        title: '首页',
        component: resolve => {
          require(['../views/home'], resolve)
        }
      }]
    },
    {
      path: '/sceneIndex',
      name: 'sceneIndex',
      component: sceneLayout,
      children: [{
        path: '/',
        title: '场景',
        component: resolve => {
          require(['../views/scene'], resolve)
        }
      }]
    },
    {
      path: '/test',
      name: 'test',
      component: sceneLayout,
      children: [{
        path: '/',
        title: '场景',
        component: resolve => {
          require(['../views/scene'], resolve)
        }
      }]
    }
  ]
})
