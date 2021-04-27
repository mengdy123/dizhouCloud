import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import map2D from './modules/map2d'
import home from './modules/home'
import common from './modules/common'
import system from './modules/system'
import weather from './modules/weather'
import operation from './modules/operationList'



import { getCookie } from '../utils/cookie.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    map2D,
    home,
    common,
    system,
    weather,
    operation
  },
})
