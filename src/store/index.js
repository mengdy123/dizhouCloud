import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import map2D from './modules/map2d'
import { getCookie } from '../utils/cookie.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    map2D,
  },
})
